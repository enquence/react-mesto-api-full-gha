import React, {useEffect} from 'react';

const Popup = ({ isOpen, onClose, containerClassName, children }) => {

  useEffect(() => {
    if (!isOpen) return
    const closeByEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  return (
    <div className={`popup${isOpen ? ' popup_opened': ''}`} onMouseDown={onClose}>
      <div className={containerClassName || 'popup__container'} onMouseDown={(evt) => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" onClick={onClose}/>
        { children }
      </div>
    </div>
  );
};

export default Popup;
