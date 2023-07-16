import closeBtn from '../images/buttons/close-btn.svg';

function PopupWithForm({
  title,
  name,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section className={`popup ${name}-popup ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <img
          onClick={onClose}
          src={closeBtn}
          className="popup__close-btn"
          alt="Кнопка закрытия попапа"
        />
        <h3 className="popup__title">{title}</h3>
        <form
          onSubmit={onSubmit}
          className="popup__edit-form"
          name={`${name}-form`}
        >
          {children}
          <button className="popup__save-btn" type="submit" value="Сохранить">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
