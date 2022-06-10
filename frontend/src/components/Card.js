import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, {useContext} from "react";

function Card({card, onCardClick, onCardLike, onCardDelete, }) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
  `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;