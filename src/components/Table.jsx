import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { requestExpenses } = this.props;
    console.log(requestExpenses);
    return (
      <div>
        <table>
          <tbody>

            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
            { requestExpenses
              .map((elem, i) => (
                <tr key={ i }>
                  <td>{elem.description}</td>
                  <td>{elem.tag}</td>
                  <td>{elem.method}</td>
                  <td>{(+elem.value).toFixed(2)}</td>
                  <td>{elem.exchangeRates[elem.currency].name}</td>
                  <td>{(+elem.exchangeRates[elem.currency].ask).toFixed(2)}</td>
                  <td>{(+elem.exchangeRates[elem.currency].ask * +elem.value).toFixed(2)}</td>
                  <td>Real</td>
                  {/* <td>test</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
