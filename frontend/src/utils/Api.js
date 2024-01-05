class Api {
  constructor({url, headers}) {
    this._url = url
    this._headers = headers
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((resp) => {
        if (resp.ok) return resp.json()
        throw new Error(`${resp.status}`)
      })
  }

  getAllCards(jwt) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'GET', headers: { 'Authorization': `Bearer ${jwt}`, ...this._headers }
    })
  }

  addCard({name, link}, jwt) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'POST', headers: { 'Authorization': `Bearer ${jwt}`, ...this._headers }, body: JSON.stringify({
        name: name, link: link
      })
    })
  }

  likeCard(cardId, isLiked, jwt) {
    return this._sendRequest(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT', headers: { 'Authorization': `Bearer ${jwt}`, ...this._headers }
    })
  }

  deleteCard(cardId, jwt) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${jwt}`, ...this._headers }
    })
  }

  getUserInfo(jwt) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET', headers: { 'Authorization': `Bearer ${jwt}`, ...this._headers }
    })
  }

  updateUserInfo({name, about}, jwt) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH', headers: { 'Authorization': `Bearer ${jwt}`, ...this._headers }, body: JSON.stringify({
        name: name, about: about
      })
    })
  }

  updateAvatar({avatar}, jwt) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH', headers: { 'Authorization': `Bearer ${jwt}`, ...this._headers }, body: JSON.stringify({
        avatar: avatar
      })
    })
  }

}

class AuthApi {
  constructor({url, headers}) {
    this._url = url
    this._headers = headers
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((resp) => {
        if (resp.ok) return resp.json()
        return Promise.reject(`Ошибка ${resp.statusCode}`);
      })
  }

  signUp(data) {
    return this._sendRequest(`${this._url}/signup`, { method: 'POST', headers: this._headers, body: JSON.stringify(data) })
  }

  signIn(data) {
    return this._sendRequest(`${this._url}/signin`, { method: 'POST', headers: this._headers, body: JSON.stringify(data) })
  }

  checkToken(token) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET', headers: {...this._headers, 'Authorization': `Bearer ${token}`}
    })
  }
}

const optionsApi = {
  url: 'https://api.enquence.students.nomoredomainsmonster.ru',
  headers: { 'Content-Type': 'application/json', }
}
const optionsAuthApi = {
  url: 'https://api.enquence.students.nomoredomainsmonster.ru',
  headers: { 'Content-Type': 'application/json', }
}

const authApi = new AuthApi(optionsAuthApi)
const api = new Api(optionsApi)

export {api, authApi}
