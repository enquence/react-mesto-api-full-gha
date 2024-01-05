import {CurrentUserContext} from "../contexts/currentUser";
import {useContext} from "react";

export default function Card({card, onCardLike, onCardClick, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <article className="card">
      <div className="card__image" style={{backgroundImage: `url(${card.link})`}} onClick={() => onCardClick(card)}/>
      {card?.owner === currentUser?._id && <button className="card__trash-button" type="button" onClick={() => onCardDelete(card.id)}/>}
      <div className="card__text">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={`card__like-button${card.likes.includes(currentUser?._id) ? ' card__like-button_active' : ''}`} type="button" onClick={() => onCardLike(card, card.likes.includes(currentUser?._id))}/>
          <span className="card__like-number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
