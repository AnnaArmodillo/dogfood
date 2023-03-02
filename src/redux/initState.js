export const initState = {
  user: {
    token: '',
    userID: '',
    email: '',
  },
  cart: [],
  favourite: [],
  filter: {
    search: '',
  },
};

export function getInitState() {
  const dataFromLS = localStorage.getItem('REDUX_LS_KEY');
  return dataFromLS ? JSON.parse(dataFromLS) : initState;
}
