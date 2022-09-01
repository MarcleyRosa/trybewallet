import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesAction, expensesEditAction,
  fetchApiCoin, fetchAsk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchApiCoin());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async ({ target }) => {
    const { dispatch } = this.props;
    if (target.id === 'edit') {
      const { requestExpenses, idEdit } = this.props;
      console.log(this.state);
      const exchanges = requestExpenses[idEdit].exchangeRates;
      requestExpenses[idEdit] = this.state;
      requestExpenses[idEdit].id = idEdit;
      requestExpenses[idEdit].exchangeRates = exchanges;
      dispatch(expensesEditAction(false));
      dispatch(expensesAction(requestExpenses));
    } else {
      this.setState((prevState) => ({
        id: prevState.id + 1,
      }));
      await dispatch(fetchAsk(this.state));
    }
    this.setState(() => ({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { requestCoin, edit } = this.props;

    const allCoin = requestCoin;
    return (
      <form action="">
        <label htmlFor="value-input">
          Valor da despesa:
          <input
            onChange={ this.handleChange }
            name="value"
            type="number"
            data-testid="value-input"
            value={ value }
          />
        </label>
        <label htmlFor="descriptions">
          Descrição da despesa:
          <input
            onChange={ this.handleChange }
            name="description"
            type="text"
            id="descriptions"
            data-testid="description-input"
            value={ description }
          />
        </label>
        <select
          onChange={ this.handleChange }
          data-testid="currency-input"
          name="currency"
          value={ currency }
        >
          { allCoin
            .map((coin, i) => <option key={ i } value={ coin }>{ coin }</option>) }
        </select>
        <select
          onChange={ this.handleChange }
          data-testid="method-input"
          name="method"
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          onChange={ this.handleChange }
          data-testid="tag-input"
          name="tag"
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        { edit ? (
          <button
            onClick={ this.handleClick }
            type="button"
            id="edit"
          >
            Editar despesa

          </button>)
          : (
            <button
              onClick={ this.handleClick }
              type="button"
            >
              Adicionar despesa
            </button>)}
        <br />
        <br />
        <br />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  requestCoin: state.wallet.currencies,
  edit: state.wallet.editor,
  idEdit: state.wallet.idToEdit,
  requestExpenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({
//   editExpenses: (state) => dispatch(expensesEditAction(state)),
// });

WalletForm.propTypes = {
  requestCoin: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  idEdit: PropTypes.number.isRequired,
  requestExpenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(WalletForm);
