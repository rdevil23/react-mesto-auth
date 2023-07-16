import closeBtn from '../images/buttons/close-btn.svg';

function InfoToolTip({ popupType, isOpen, onClose }) {
  return (
    <section className={`popup infoTooltip-popup ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <img onClick={onClose} src={closeBtn} className="popup__close-btn" alt="Кнопка закрытия попапа" />
        <img src={popupType.image} className="popup__icon" alt={`Иконка для уведомления: ${popupType.message}`} />
        <p className="popup__icon-text">{popupType.message}</p>
      </div>
    </section>
  );
}

export default InfoToolTip;
