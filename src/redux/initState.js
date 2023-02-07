export const initState = {
  token: '',
  userID: '',
  cart: [],
  filter: {
    search: '',
  },
};

export function getInitState() {
  const dataFromLS = localStorage.getItem('REDUX_LS_KEY');
  return dataFromLS ? JSON.parse(dataFromLS) : initState;
}
