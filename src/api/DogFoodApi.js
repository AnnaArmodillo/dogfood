class DogFoodApi {
  constructor({ baseURL }) {
    this.baseURL = baseURL;
    this.group = 'sm9';
    this.userID = '';
  }

  setUserID(userID) {
    this.userID = userID;
  }

  // eslint-disable-next-line class-methods-use-this
  getAuthorizationToken(token) {
    return `Bearer ${token}`;
  }

  // eslint-disable-next-line class-methods-use-this
  checkToken(token) {
    if (!token) throw new Error('Отсутствует токен');
  }

  async signin(values) {
    const res = await fetch(`${this.baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (res.status === 401) {
      throw new Error('Неверные логин или пароль');
    }
    if (res.status === 404) {
      throw new Error('Пользователь с указанным email не найден');
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`);
    }
    return res.json();
  }

  async signup(values) {
    const res = await fetch(`${this.baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (res.status === 409) {
      throw new Error('Юзер с указанным email уже существует');
    }
    if (res.status === 400) {
      throw new Error('Некорректно заполнено одно из полей');
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`);
    }
  }

  async getAllProducts(search, token) {
    this.checkToken(token);
    const res = await fetch(`${this.baseURL}/products/search?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
        'Content-Type': 'application/json',
      },
      groupId: this.group,
    });
    if (res.status >= 400) {
      throw new Error(
        `Ошибка, код ${res.status}`,
      );
    }
    return res.json();
  }

  async getProductByID(token) {
    this.checkToken(token);
  }

  getProductsByIDs(ids, token) {
    this.checkToken(token);
    return Promise.all(
      ids.map((id) => fetch(`${this.baseURL}/products/${id}`, {
        headers: {
          authorization: this.getAuthorizationToken(token),
          'Content-Type': 'application/json',
        },
        groupId: this.group,
      }).then((res) => res.json())),
    );
  }
}

export const dogFoodApi = new DogFoodApi({
  baseURL: 'https://api.react-learning.ru',
});
