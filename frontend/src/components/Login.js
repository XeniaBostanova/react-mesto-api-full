import React, { useState } from "react";

function Login({onLogin}) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  function handleInputChange(e) {
    const {name, value} = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      return;
    }
    onLogin(inputs.email, inputs.password);
  }

  return (
    <div className="form__container form__container_type_login">
      <h2 className="form__title">Вход</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input id="email-input" type="email" name="email" value={inputs.email || ''} onChange={handleInputChange} className="form__item form__item_type_email form__item_theme_dark" placeholder="Email" minLength="4" maxLength="40" required />
        <span className="form__input-error email-input-error"></span>
        <input id="password-input" type="password" name="password" value={inputs.password || ''} onChange={handleInputChange} className="form__item form__item_type_password form__item_theme_dark" placeholder="Пароль" minLength="8" maxLength="20" required />
        <span className="form__input-error about-input-error"></span>
        <button type="submit" className="form__button form__button_theme_dark">Войти</button>
      </form>
    </div>
  )
}

export default Login;