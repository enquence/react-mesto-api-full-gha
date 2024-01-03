import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";
import useValidateUrl from "../hooks/useValidateUrl";
import useForm from "../hooks/useForm";

const EditAvatarPopup = ({isOpen, isLoading, onClose, onUpdateAvatar}) => {

  const avatarInput = useRef(null)
  const {values, setValues, modifiedFlags, resetFlags, handleChange} = useForm({avatar: ''})
  const [isLinkValid, linkErrorMessage] = useValidateUrl(values.avatar)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onUpdateAvatar(values)
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout( () => avatarInput.current.focus(), 100)
      setValues({avatar: ''})
      resetFlags()
    }
  }, [isOpen, setValues])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isLinkValid}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input className={`form__field${!isLinkValid && modifiedFlags.avatar ? ' form__field_type_error' : ''}`}
             type="url"
             name="avatar"
             placeholder="Введите ссылку на картинку"
             autoComplete="off"
             ref={avatarInput}
             value={values.avatar}
             onChange={handleChange}
      />
      <span className={`form__field-error${(!isLinkValid && modifiedFlags.avatar && isOpen) ? ' form__field-error_active' : ''}`}>{linkErrorMessage}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
