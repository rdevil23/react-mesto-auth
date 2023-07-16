import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleInputName(e) {
    setName(e.target.value);
  }

  function handleInputDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ''}
        onChange={handleInputName}
        className="popup__input popup__input_type_name"
        id="input-name"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className="popup__input-error name-error"
        id="input-name-error"
      ></span>
      <input
        value={description || ''}
        onChange={handleInputDescription}
        className="popup__input popup__input_type_job"
        id="input-job"
        name="about"
        type="text"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className="popup__input-error job-error"
        id="input-job-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
