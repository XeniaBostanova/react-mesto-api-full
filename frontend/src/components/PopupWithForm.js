function PopupWithForm({name, isOpen, onClose, title, onSubmit, children, buttonText}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ?'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button type="button" className="popup__close" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`form__button form__button_type_${name}`}>{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;