import { GET_COIN, ASK_ACTION, CHANGE_EXPENSES } from '../actions';

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
  case ASK_ACTION: return {
    ...state,
    expenses: [...state.expenses, action.expense],
  };
  case CHANGE_EXPENSES: return {
    ...state,
    expenses: [...action.state],
  };
  default: return state;
  }
}

export default wallet;
