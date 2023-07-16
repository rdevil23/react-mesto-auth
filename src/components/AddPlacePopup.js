import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: title,
      link: link,
    });
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Добавить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={title || ''}
        onChange={handleTitleChange}
        className="popup__input popup__input_type_title"
        id="input-title"
        name="name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        className="popup__input-error title-error"
        id="input-title-error"
      ></span>
      <input
        value={link || ''}
        onChange={handleLinkChange}
        className="popup__input popup__input_type_link"
        id="input-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        className="popup__input-error link-error"
        id="input-link-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
