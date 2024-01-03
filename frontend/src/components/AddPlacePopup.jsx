import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";
import useValidateText from "../hooks/useValidateText";
import useValidateUrl from "../hooks/useValidateUrl";
import useForm from "../hooks/useForm";

const AddPlacePopup = ({isOpen, isLoading, onClose, onAddCard}) => {

  const {values, setValues, modifiedFlags, resetFlags, handleChange} = useForm({ name: '', link: ''})

  const nameInput = useRef()

  const [isNameValid, nameErrorMessage] = useValidateText(values.name, 2, 30)
  const [isLinkValid, linkErrorMessage] = useValidateUrl(values.link)

  const isFormValid = isLinkValid && isNameValid

  useEffect(() => {
    if (isOpen) {
      setValues({ name: '', link: ''})
      resetFlags()
      setTimeout( () => nameInput.current.focus(), 100)
    }
  }, [isOpen, setValues])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onAddCard(values)
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      buttonText='Создать'
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isFormValid}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input className={`form__field${!isNameValid && modifiedFlags.name ? ' form__field_type_error' : ''}`}
             type="text"
             name="name"
             ref={nameInput}
             placeholder="Название" autoComplete="off"
             value={values.name}
             onChange={handleChange}
      />
      <span className={`form__field-error${(!isNameValid && modifiedFlags.name && isOpen) ? ' form__field-error_active' : ''}`}>{nameErrorMessage}</span>
      <input className={`form__field${!isLinkValid && modifiedFlags.link ? ' form__field_type_error' : ''}`}
             type="url"
             name="link"
             placeholder="Ссылка на картинку" autoComplete="off"
             value={values.link}
             onChange={handleChange}/>
      <span className={`form__field-error${(!isLinkValid && modifiedFlags.link && isOpen) ? ' form__field-error_active' : ''}`}>{linkErrorMessage}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
