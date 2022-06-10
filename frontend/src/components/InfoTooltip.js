import successImage from '../images/success-image.svg';
import failImage from '../images/fail-image.svg'

function InfoTooltip({name, isOpen, onClose, status}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ?'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__image" alt="Иконка состояния входа" src={status ? successImage : failImage} />
        <h2 className={`popup__title popup__title_type_${name}`}>{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;