import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { requestAsk = [] } = this.props;
    console.log(requestAsk);
    const ask = requestAsk
      .reduce((acc, curr) => +acc
       + (+curr.exchangeRates[curr.currency].ask * +curr.value), 0).toFixed(2);
    return (
      <div>
        <span data-testid="total-field">{ ask }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestAsk: state.wallet.expenses,
});

Header.propTypes = {
  requestAsk: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(Header);
