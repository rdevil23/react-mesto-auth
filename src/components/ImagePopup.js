import closeBtn from '../images/buttons/close-btn.svg';

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_open-img ${card ? 'popup_opened' : ''}`}
    >
      <div className="popup__img-container">
        <img
          onClick={onClose}
          className="popup__close-btn"
          src={closeBtn}
          alt="Кнопка закрытия попапа"
        />
        <img
          className="popup__img"
          src={card && card.link}
          alt={card && card.name}
        />
        <h3 className="popup__img-title">{card && card.name}</h3>
      </div>
    </section>
  );
}

export default ImagePopup;
