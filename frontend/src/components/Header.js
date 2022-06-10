import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

function Header({userEmail, handleSignOut}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    }

  return (
    
      <Switch>
        <Route exact path="/">
          <header className="header">
            <div className="header__container">
              <img src={logo} alt="Логотип Место" className="header__logo" />
              <div className={!isMenuOpen ? 'header__open-button' : 'header__close-button'} onClick={toggleBurgerMenu} />
            </div>  
            <div className={`header__menu ${isMenuOpen ?'header__menu_opened' : ''}`}>
              <h3 className="header__item">{userEmail}</h3>
              <Link to="/sign-in" onClick={handleSignOut} className="header__item header__item_type_link">Выйти</Link>
            </div>
          </header>  
        </Route>
      
        <Route path="/sign-up">
          <header className="header header__sign">
            <div className="header__container">
              <img src={logo} alt="Логотип Место" className="header__logo" />
              <Link to="/sign-in" className="header__link">Войти</Link>
            </div>
          </header>
        </Route>

        <Route path="/sign-in">
          <header className="header header__sign">
            <div className="header__container">
              <img src={logo} alt="Логотип Место" className="header__logo" />
              <Link to="/sign-up" className="header__link">Регистрация</Link>
            </div>
        </header>
        </Route>

      </Switch>

  );
}

export default Header;
