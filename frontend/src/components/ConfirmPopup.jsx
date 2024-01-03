import React from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = ({isOpen, isLoading, onClose, onConfirm}) => {

  const handleConfirm = (evt) => {
    evt.preventDefault()
    onConfirm()
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText='Да'
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={true}
      onSubmit={handleConfirm}
      onClose={onClose}
    />
  );
};

export default ConfirmPopup;
