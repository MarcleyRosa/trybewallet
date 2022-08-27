import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiCoin } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchApiCoin());
  }

  handleClick = () => {
    console.log('test');
  };

  render() {
    const { requestCoin } = this.props;
    console.log(requestCoin);
    const allCoin = requestCoin;
    return (
      <form action="">
        <div data-testid="value-input">{}</div>
        <div data-testid="description-input">{}</div>
        <select data-testid="currency-input" name="" id="">
          { allCoin
            .map((currency, i) => <option key={ i } value="">{ currency }</option>) }
        </select>
        <select data-testid="method-input" name="" id="">
          <option value="">Dinheiro</option>
          <option value="">Cartão de crédito</option>
          <option value="">Cartão de débito</option>
        </select>
        <select data-testid="tag-input" name="" id="">
          <option value="">Alimentação</option>
          <option value="">Lazer</option>
          <option value="">Trabalho</option>
          <option value="">Transporte</option>
          <option value="">Saúde</option>
        </select>
        <button onClick={ this.handleClick } type="button">Request</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  requestCoin: state.wallet.currencies,
});

WalletForm.propTypes = {
  requestCoin: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(WalletForm);
