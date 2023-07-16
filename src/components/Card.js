import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import deleteBtn from '../images/buttons/delete-btn.svg';

function Card({
  card,
  name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${isOwn && 'elements__delete'}`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && 'elements__like_active'
  }`;

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
    <li className="elements__item">
      {isOwn && (
        <img
          src={deleteBtn}
          onClick={handleDeleteClick}
          className={cardDeleteButtonClassName}
          alt="кнопка 'удалить'"
        />
      )}
      <img
        onClick={handleClick}
        src={link}
        className="elements__img"
        alt={name}
      />
      <div className="elements__info">
        <h3 className="elements__text">{name}</h3>
        <div className="elements__likes-wrapper">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="кнопка 'нравится'"
          ></button>
          <p className="elements__likes-counter">{likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
