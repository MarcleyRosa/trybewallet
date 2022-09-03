import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
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
      <form action="" className="form-edit">
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
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            onChange={ this.handleChange }
            data-testid="currency-input"
            name="currency"
            value={ currency }
            id="currency-input"
          >
            { allCoin
              .map((coin, i) => <option key={ i } value={ coin }>{ coin }</option>) }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          {' '}
          <select
            onChange={ this.handleChange }
            data-testid="method-input"
            name="method"
            value={ method }
            id="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          {' '}
          <select
            onChange={ this.handleChange }
            data-testid="tag-input"
            name="tag"
            value={ tag }
            id="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
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
        { edit ? (
          <button
            onClick={ this.handleClick }
            type="button"
            id="edit"
            className="add"
          >
            Editar despesa

          </button>)
          : (
            <button
              onClick={ this.handleClick }
              type="button"
              className="add"
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

WalletForm.propTypes = {
  requestCoin: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  idEdit: PropTypes.number.isRequired,
  requestExpenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(WalletForm);
