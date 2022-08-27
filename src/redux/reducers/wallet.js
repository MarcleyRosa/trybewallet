import { GET_COIN } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
  case GET_COIN: return {
    ...state,
    currencies: Object.keys(action.state).filter((elem) => elem !== 'USDT'),
  };
  default: return state;
  }
}

export default wallet;
