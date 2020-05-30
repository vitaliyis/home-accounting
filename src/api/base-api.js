export class BaseApi {
  static baseUrl = 'http://localhost:3001/'

  static getUrl(url) {
    return this.baseUrl + url
  }

  static get(url = '') {
    return fetch(this.getUrl(url))
      .then(response => response.json())
      .catch(err => console.log(err))
  }

  static post(url = '', data = {}) {
    return fetch(this.getUrl(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(err => console.log(err))
  }

  static put(url = '', data = {}) {
    return fetch(this.getUrl(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(err => console.log(err))
  }
}