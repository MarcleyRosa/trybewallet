import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const currency = 'BRL';
    const { requestEmail } = this.props;
    const { requestAsk = [] } = this.props;
    const ask = requestAsk
      .reduce((acc, curr) => +acc
       + (+curr.exchangeRates[curr.currency].ask * +curr.value), 0).toFixed(2);
    return (
      <div className="back-color">
        <h5 data-testid="email-field">{ `Email: ${requestEmail}` }</h5>

        <h5>
          Despesa Total: R$ $
          <span data-testid="total-field">{ask}</span>
          <span data-testid="header-currency-field">{currency}</span>

        </h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestAsk: state.wallet.expenses,
  requestEmail: state.user.email,
});

Header.propTypes = {
  requestAsk: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  requestEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
