import React from 'react';
import Popup from "./Popup";

const InfoToolTip = ({notification, isOpen, onClose}) => {

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={`popup__pic_type_${notification.type} popup__pic`}/>
      <h2 className="popup__text">{notification.text}</h2>
    </Popup>
  )
};

export default InfoToolTip;
