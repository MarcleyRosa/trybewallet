import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { expensesAction, expensesEditAction } from '../redux/actions';

class Table extends Component {
  buttonDelete = ({ target }) => {
    const { requestExpenses, newExpenses } = this.props;
    const filterId = requestExpenses.filter((elem) => elem.id !== +target.id);
    newExpenses(filterId);
  };

  buttonEdit = ({ target }) => {
    const { editExpenses } = this.props;
    editExpenses(true, target.id);
  };

  render() {
    const { requestExpenses, editor, idToEdit } = this.props;
    return (
      <div className="table-edit">
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
                <tr
                  className={ editor && elem.id === idToEdit ? 'item-edit' : '' }
                  key={ elem.id }
                >
                  <td id="item-center">{elem.description}</td>
                  <td id="item-center">{elem.tag}</td>
                  <td id="item-center">{elem.method}</td>
                  <td id="item-center">{(+elem.value).toFixed(2)}</td>
                  <td id="item-center">{elem.exchangeRates[elem.currency].name}</td>
                  <td
                    id="item-center"
                  >
                    {(+elem.exchangeRates[elem.currency].ask).toFixed(2)}

                  </td>
                  <td id="item-center">
                    {
                      (+elem.exchangeRates[elem.currency].ask * +elem.value)
                        .toFixed(2)
                    }
                  </td>
                  <td id="item-center">Real</td>
                  <td id="item-center">
                    { !editor && (
                      <div>
                        <button
                          onClick={ this.buttonEdit }
                          type="button"
                          data-testid="edit-btn"
                          id={ elem.id }
                          className="edit-button"
                        >
                          Editar
                        </button>
                        <button
                          onClick={ this.buttonDelete }
                          type="button"
                          data-testid="delete-btn"
                          id={ elem.id }
                          className="delete-button"
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        { editor && <h2 className="text-edit">Editando despesa</h2>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestExpenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  newExpenses: (state) => dispatch(expensesAction(state)),
  editExpenses: (state, id) => dispatch(expensesEditAction(state, id)),
});

Table.propTypes = {
  requestExpenses: PropTypes.shape().isRequired,
  map: PropTypes.func.isRequired,
  newExpenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  editExpenses: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
