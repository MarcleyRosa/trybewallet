import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesAction } from '../redux/actions';
// import WalletForm from './WalletForm';

class Table extends Component {
  // state = {
  //   edit: false,
  // };

  buttonDelete = ({ target }) => {
    const { requestExpenses, newExpenses } = this.props;
    const filterId = requestExpenses.filter((elem) => elem.id !== +target.id);
    newExpenses(filterId);
  };

  buttonEdit = ({ target }) => {
    console.log(target);
    // this.setState(() => ({
    //   edit: true,
    // }));
  };

  // handleChange = () => {
  //   console.log();
  // };

  render() {
    const { requestExpenses } = this.props;
    // const { edit } = this.state;
    return (
      <div>
        <table>
          <tbody>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
            { requestExpenses
              .map((elem) => (
                <tr key={ elem.id }>
                  <td>{elem.description}</td>
                  <td>{elem.tag}</td>
                  <td>{elem.method}</td>
                  <td>{(+elem.value).toFixed(2)}</td>
                  <td>{elem.exchangeRates[elem.currency].name}</td>
                  <td>{(+elem.exchangeRates[elem.currency].ask).toFixed(2)}</td>
                  <td>
                    {
                      (+elem.exchangeRates[elem.currency].ask * +elem.value)
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      onClick={ this.buttonEdit }
                      type="button"
                      data-testid="edit-btn"
                      id={ elem.id }
                    >
                      Editar
                    </button>
                    <button
                      onClick={ this.buttonDelete }
                      type="button"
                      data-testid="delete-btn"
                      id={ elem.id }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* { edit && <WalletForm /> } */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  newExpenses: (state) => dispatch(expensesAction(state)),
});

Table.propTypes = {
  requestExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  map: PropTypes.func.isRequired,
  newExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
