import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="Раздел профиля">
        <button
          onClick={onEditAvatar}
          className="profile__avatar-edit-btn"
          type="button"
          aria-label="Кнопка изменения аватара"
        >
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Ваша аватарка"
          />
        </button>
        <div className="profile__info">
          <div className="profile__top-str">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-btn"
              type="button"
              aria-label="Кнопка редактирования профиля"
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-btn"
          type="button"
          aria-label="Кнопка добавления поста"
        ></button>
      </section>

      <section className="elements" aria-label="Фотогалерея">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
