import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Обновить аватар" buttonText="Сохранить">
      <input ref={inputRef} id="avatar-input" type="url" name="avatar" className="form__item form__item_type_link" placeholder="Ссылка на аватар" required />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;