import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onAddPlace({
      name,
      link,
    });
    onClose();
  }

  return (
    <PopupWithForm name="add" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Новое место" buttonText="Создать">
      <input id="title-input" type="text" name="name"  value={name} onChange={handleNameChange} className="form__item form__item_type_title" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="form__input-error title-input-error"></span>
      <input id="link-input" type="url" name="link" value={link} onChange={handleLinkChange} className="form__item form__item_type_link" placeholder="Ссылка на картинку" required />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;