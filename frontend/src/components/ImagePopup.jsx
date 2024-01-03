import Popup from "./Popup";

function ImagePopup({card, onClose}) {

  return (
    <Popup isOpen={!!card} onClose={onClose} containerClassName='popup__image-container'>
      <figure className="popup__image-content">
        <img className="popup__image" src={card?.link} alt={card?.name}/>
        <figcaption className="popup__image-caption">{card?.name}</figcaption>
      </figure>
    </Popup>
  )
}

export default ImagePopup
