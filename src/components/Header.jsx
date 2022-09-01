import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { requestAsk = [] } = this.props;
    const ask = requestAsk
      .reduce((acc, curr) => +acc
       + (+curr.exchangeRates[curr.currency].ask * +curr.value), 0).toFixed(2);
    return (
      <div>
        <h3 data-testid="total-field">{ ask }</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestAsk: state.wallet.expenses,
});

Header.propTypes = {
  requestAsk: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, null)(Header);
