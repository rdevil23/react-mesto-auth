import { baseUrl, headers } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} - не удалось установить подключение к api`);
    }
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`users/me`, {
      headers: this._headers,
    });
  }

  updateUserInfo(data) {
    return this._request(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    });
  }

  updateUserAvatar(data) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  getCards() {
    return this._request(`cards`, {
      headers: this._headers,
    });
  }

  addNewCard({ name, link }) {
    return this._request(`cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  removeCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteCardLike(cardId) {
    return this._request(`cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }
}

const api = new Api({ baseUrl, headers });
export default api;
