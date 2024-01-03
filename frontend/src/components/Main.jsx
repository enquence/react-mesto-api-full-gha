import { useContext } from 'react'
import Card from './Card';
import {CurrentUserContext} from "../contexts/currentUser";

function Main({cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar" style={{backgroundImage: `url(${currentUser.avatar})`}}/>
          <button className="profile__avatar-edit" onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
          </div>
          <p className="profile__user-about">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        {cards.map((card) =>
          <Card
            key={card.id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}/>)
        }
      </section>
    </main>
  )
}

export default Main;
