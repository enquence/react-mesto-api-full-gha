import React, {useContext, useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/currentUser";
import useValidateText from "../hooks/useValidateText";
import useForm from "../hooks/useForm";

function EditProfilePopup({isOpen, isLoading, onClose, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext)
  const {values, setValues, handleChange} = useForm(currentUser)

  const nameInput = useRef()

  const [isNameValid, nameErrorMessage] = useValidateText(values.name, 2, 40)
  const [isAboutValid, aboutErrorMessage] = useValidateText(values.about, 2, 200)

  const isFormValid = isAboutValid && isNameValid

  useEffect(() => {
    if (isOpen) {
      setValues(currentUser)
      setTimeout( () => nameInput.current.focus(), 100)
    }
  }, [currentUser, isOpen, setValues])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onUpdateUser(values)
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isFormValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className={`form__field${!isNameValid ? ' form__field_type_error' : ''}`}
             type="text"
             name="name"
             ref={nameInput}
             placeholder="Ваше имя"
             autoComplete="off"
             value={values.name || ''}
             onChange={handleChange}/>
      <span className={`form__field-error${(!isNameValid && isOpen) ? ' form__field-error_active' : ''}`}>{nameErrorMessage}</span>
      <input className={`form__field${!isAboutValid ? ' form__field_type_error' : ''}`}
             type="text"
             name="about"
             placeholder="Что вас определяет?"
             autoComplete="off"
             value={values.about || ''}
             onChange={handleChange}/>
      <span className={`form__field-error${(!isAboutValid && isOpen) ? ' form__field-error_active' : ''}`}>{aboutErrorMessage}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
