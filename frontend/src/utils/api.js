class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._getResponseData)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._getResponseData)
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getResponseData)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(id, isLiked) {
    const methodName = (isLiked ? "PUT" : "DELETE");
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: methodName,
        headers: this._headers,
      })
        .then(this._getResponseData)
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._getResponseData)
  }

}

export const api = new Api({
  baseUrl: 'https://api.study.hard.nomoreparties.sbs',
});
