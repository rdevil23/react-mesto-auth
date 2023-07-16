import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        className="popup__input popup__input_type_link"
        id="avatar-link"
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        required
      />
      <span
        className="popup__input-error link-error"
        id="avatar-link-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
