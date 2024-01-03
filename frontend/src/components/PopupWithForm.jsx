import Popup from "./Popup";

function PopupWithForm({name, title, buttonText, isOpen, isLoading, isValid, onClose, onSubmit, children}) {

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
        <h2 className="popup__title">{title}</h2>
        <form className={`form form_type_${name}`} name={name} onSubmit={onSubmit}>
          {children}
          <button className={`form__save-button${!isValid ? ' form__save-button_inactive' : ''}`} type="submit">
            { (isOpen && isLoading)
              ? <span className="form__button-spinner"/>
              : buttonText || 'Сохранить'
            }
          </button>
        </form>
    </Popup>
  )
}

export default PopupWithForm;
