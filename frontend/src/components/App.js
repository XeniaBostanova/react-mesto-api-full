import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React, { useState, useEffect} from 'react';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if(loggedIn) {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err))
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((deletedCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id ? c : deletedCard = null));
      })
      .catch((err) => console.log(err))
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard({name: card.name, link: card.link});
  }

  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(user) {
    api.editAvatar(user.avatar)
      .then((res) => {;
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then((res) => {
        if(res) {
          history.push('/sign-in');
          setStatus(true);
        }
      })
      .catch(() => {
        setStatus(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.jwt);
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/');
        }
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setStatus(false);
      })
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} handleSignOut={handleSignOut} />

        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            openImage={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-up">
            <Register onRegister={handleRegisterSubmit} /> 
          </Route>

          <Route path="/sign-in">
            <Login onLogin={handleLoginSubmit} /> 
          </Route>
          
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        {loggedIn && <Footer />}
      </div>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip name="info" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={status} />
    </CurrentUserContext.Provider>
  );
}

export default App;
