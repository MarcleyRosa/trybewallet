import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const currency = 'BRL';
    const { requestEmail } = this.props;
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
        <div data-testid="email-field">{ requestEmail }</div>
        {/* <div data-testid="total-field">{ values }</div> */}
        <div data-testid="header-currency-field">{ currency }</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestEmail: state.user.email,
});

Wallet.propTypes = {
  requestEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
