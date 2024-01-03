import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {useEffect, useRef, useState} from "react";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {CurrentUserContext} from "../contexts/currentUser";
import {api, authApi} from "../utils/Api";
import {normalizeCard} from "../utils/utils";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [email, setEmail] = useState(null)
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false)
  const [notification, setNotification] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const confirmAction = useRef()
  const navigate = useNavigate()

  const handleClosePopupsOnEsc = (evt) => {
    if (evt.key === 'Escape') closeAllPopups()
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
    window.addEventListener('keyup', handleClosePopupsOnEsc)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
    window.addEventListener('keyup', handleClosePopupsOnEsc)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
    window.addEventListener('keyup', handleClosePopupsOnEsc)
  }

  const showNotificationPopup = ({type, text}) => {
    setNotification({type, text})
    setIsNotificationPopupOpen(true)
  //  window.addEventListener('keyup', handleClosePopupsOnEsc)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsNotificationPopupOpen(false)
    setSelectedCard(null)
  //  window.removeEventListener('keyup', handleClosePopupsOnEsc)
  }

  const handleCardLike = (card, isLikedByUser) => {
    api.likeCard(card.id, isLikedByUser)
      .then(responseCard => setCards(cards.map(el => el.id === responseCard._id ? normalizeCard(responseCard) : el)))
      .catch((err) => console.log(err))
  }

  const handleCardDelete = (cardId) => {
    setIsConfirmPopupOpen(true)
//    window.addEventListener('keyup', handleClosePopupsOnEsc)
    confirmAction.current = () => {
      setIsLoading(true)
      api.deleteCard(cardId)
        .then(() => {
          setCards(cards.filter(card => card.id !== cardId))
          closeAllPopups()
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  const handleSignIn = (data) => {
    setIsLoading(true)
    authApi.signIn(data)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true)
          localStorage.setItem('token', data.token);
          checkTokenLocally()
          navigate('/', {replace: true})
        }
      })
      .catch(() => showNotificationPopup({type: 'cross', text: 'Что-то пошло не так! Попробуйте еще раз.'}))
      .finally(() => setIsLoading(false))
  }

  const handleSignUp = (data) => {
    setIsLoading(true);
    authApi.signUp(data)
      .then((res) => {
          showNotificationPopup({type: 'ok', text: 'Вы успешно зарегистрировались!'})
          navigate('/sign-in', {replace: true})
          return res
        })
      .catch(() => showNotificationPopup({type: 'cross', text: 'Что-то пошло не так! Попробуйте еще раз.'}))
      .finally(() => setIsLoading(false))
  }

  const handleLogout = () => {
    if (localStorage.getItem('token')) localStorage.removeItem('token')
    setLoggedIn(false)
    setEmail(null)
    navigate('/sign-in')
  }

  const checkTokenLocally = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      authApi.checkToken(token)
        .then(res => {
          setLoggedIn(true)
          setEmail(res.data.email)
          navigate('/', {replace: true})
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    checkTokenLocally()
    api.getUserInfo()
      .then((user) => setCurrentUser({...currentUser, ...user}))
      .then(() => api.getAllCards())
      .then((data) => setCards(data.map(card => normalizeCard(card))))
      .catch((err) => console.log(err))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={email} onLogout={handleLogout}/>
      <Routes>
        <Route path='/'
               element={<ProtectedRoute
                 element={Main}
                 cards={cards}
                 onEditProfile={handleEditProfileClick}
                 onEditAvatar={handleEditAvatarClick}
                 onAddPlace={handleAddPlaceClick}
                 onCardClick={(card) => {
                   setSelectedCard(card)
                   window.addEventListener('keyup', handleClosePopupsOnEsc)
                 }}
                 onCardLike={handleCardLike}
                 onCardDelete={handleCardDelete}
                 onClose={closeAllPopups}
                 loggedIn={loggedIn}
               />}
        />
        <Route path='/sign-in' element={<Login isLoading={isLoading} onSubmit={handleSignIn}/>}/>
        <Route path='/sign-up' element={<Register isLoading={isLoading} onSubmit={handleSignUp}/>}/>
      </Routes>
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        isLoading={isLoading}
                        onClose={closeAllPopups}
                        onUpdateUser={({name, about}) => {
                          setIsLoading(true)
                          api.updateUserInfo({name, about})
                            .then((user) => {
                              setCurrentUser({...currentUser, ...user})
                              closeAllPopups()
                            })
                            .catch((err) => console.log(err))
                            .finally(() => setIsLoading(false))
                        }}
      />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                       isLoading={isLoading}
                       onClose={closeAllPopups}
                       onUpdateAvatar={({avatar}) => {
                         setIsLoading(true)
                         api.updateAvatar({avatar})
                           .then((user) => {
                             setCurrentUser({...currentUser, ...user})
                             closeAllPopups()
                           })
                           .catch((err) => console.log(err))
                           .finally(() => setIsLoading(false))
                       }}
      />
      <AddPlacePopup isOpen={isAddPlacePopupOpen}
                     isLoading={isLoading}
                     onClose={closeAllPopups}
                     onAddCard={(newCard) => {
                       setIsLoading(true)
                       api.addCard(newCard)
                         .then((card) => {
                           setCards([normalizeCard(card)].concat(cards))
                           closeAllPopups()
                         })
                         .catch((err) => console.log(err))
                         .finally(() => setIsLoading(false))
                     }}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        isLoading={isLoading}
        onConfirm={() => confirmAction.current()}
        onClose={closeAllPopups}
      />
      <InfoToolTip
        isOpen={isNotificationPopupOpen}
        notification={notification}
        text="Вы успешно зарегистрировались!"
        type="ok"
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      {
        loggedIn && <Footer/>
      }
    </CurrentUserContext.Provider>
  )
}

export default App;
