export const SAVE_EMAIL = 'CHANGE_EMAIL';
export const GET_COIN = 'GET_COIN';

export const saveEmailAction = (state) => ({
  type: SAVE_EMAIL,
  state,
});

export const apiCoin = (state) => ({
  type: GET_COIN,
  state,
});

export const fetchApiCoin = () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      dispatch(apiCoin(json));
    } catch (error) {
      console.log(error);
    }
  };
};
