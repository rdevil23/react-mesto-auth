import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import api from '../utils/api';
import apiAuth from '../utils/apiAuth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';

import '../index.css';
import successImg from '../images/success.svg';
import failImg from '../images/fail.svg';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailValue, setEmailValue] = useState(null);
  const [popupType, setPopupType] = useState({ image: '', message: '' });
  const [isInfoTooltip, setInfoToolTip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmailValue(res.data.email);
            navigate('/');
          }
        })
        .catch(console.error);
    }
  }, []);

  function handleLogin({ email, password }) {
    apiAuth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmailValue(email);
        navigate('/');
      })
      .catch(() => {
        setPopupType({ image: failImg, message: 'Что-то пошло не так! Попробуйте еще раз.' });
        handleInfoToolTip();
      });
  }

  function handleRegister({ email, password }) {
    apiAuth
      .register(email, password)
      .then((res) => {
        setPopupType({ image: successImg, message: 'Вы успешно зарегистрировались!' });
        navigate('/sign-in');
      })
      .catch(() => {
        setPopupType({ image: failImg, message: 'Что-то пошло не так! Попробуйте еще раз.' });
      })
      .finally(handleInfoToolTip);
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmailValue(null);
    navigate('/sign-in');
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([profileInfo, card]) => {
        setCurrentUser(profileInfo);
        setCards(card);
      })
      .catch(console.error);
  }, [loggedIn]);

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleInfoToolTip() {
    setInfoToolTip(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch(console.error);
    } else {
      api
        .deleteCardLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch(console.error);
    }
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch(console.error);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoToolTip(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
          <Route
            exact
            path="/"
            element={
              <>
                <Header title="Выйти" route="" email={emailValue} onClick={handleLogOut} />
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={handleLogin} onSubmit={handleInfoToolTip} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={handleRegister} />
              </>
            }
          />
        </Routes>

        <Footer />

        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip popupType={popupType} isOpen={isInfoTooltip} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
