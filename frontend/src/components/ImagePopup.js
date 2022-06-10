function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card.link && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image-item" />
        <h3 className="popup__image-caption">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;