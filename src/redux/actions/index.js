export const SAVE_EMAIL = 'CHANGE_EMAIL';
export const GET_COIN = 'GET_COIN';
export const CHANGE_EXPENSES = 'CHANGE_EXPENSES';
export const ASK_ACTION = 'ASK_ACTION';
export const EXPENSES_EDIT = 'EXPENSES_EDIT';
export const ADC_EDIT = 'ADC_EDIT';

export const saveEmailAction = (state) => ({
  type: SAVE_EMAIL,
  state,
});

export const apiCoin = (state) => ({
  type: GET_COIN,
  state,
});

export const expensesAction = (state) => ({
  type: CHANGE_EXPENSES,
  state,
});

export const expensesEditAction = (state, id) => ({
  type: EXPENSES_EDIT,
  state,
  id,
});

export const adcExpensesAction = (state) => ({
  type: ADC_EDIT,
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

export const fetchAsk = (state) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      dispatch({
        type: ASK_ACTION,
        expense: {
          ...state,
          exchangeRates: json,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
