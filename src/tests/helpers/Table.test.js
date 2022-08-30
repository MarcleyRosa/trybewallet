import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';

describe('Test do componente Table.js', () => {
  const userEmail = 'tryber@teste.com';

  it('Verifica usuario', async () => {
    const initialState = {

      user: {
        email: userEmail,
      },
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            id: 0,
            value: '1',
            description: 'test',
            currency: 'USD',
            method: 'Cartão de crédito',
            tag: 'Alimentação',
            exchangeRates: {
              USD: {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '5.1198',
                low: '5.009',
                varBid: '0.09',
                pctChange: '1.79',
                bid: '5.118',
                ask: '5.1185',
                timestamp: '1661892330',
                create_date: '2022-08-30 17:45:30',
              },
              USDT: {
                code: 'USD',
                codein: 'BRLT',
                name: 'Dólar Americano/Real Brasileiro Turismo',
                high: '5.14',
                low: '5.04',
                varBid: '0.085',
                pctChange: '1.68',
                bid: '4.98',
                ask: '5.29',
                timestamp: '1661887920',
                create_date: '2022-08-30 16:32:00',
              },
              CAD: {
                code: 'CAD',
                codein: 'BRL',
                name: 'Dólar Canadense/Real Brasileiro',
                high: '3.9104',
                low: '3.8512',
                varBid: '0.0446',
                pctChange: '1.16',
                bid: '3.9083',
                ask: '3.9096',
                timestamp: '1661892333',
                create_date: '2022-08-30 17:45:32',
              },
              GBP: {
                code: 'GBP',
                codein: 'BRL',
                name: 'Libra Esterlina/Real Brasileiro',
                high: '5.9682',
                low: '5.8643',
                varBid: '0.0791',
                pctChange: '1.34',
                bid: '5.9629',
                ask: '5.9682',
                timestamp: '1661892333',
                create_date: '2022-08-30 17:45:35',
              },
              ARS: {
                code: 'ARS',
                codein: 'BRL',
                name: 'Peso Argentino/Real Brasileiro',
                high: '0.0369',
                low: '0.0362',
                varBid: '0.0005',
                pctChange: '1.37',
                bid: '0.0369',
                ask: '0.0369',
                timestamp: '1661892333',
                create_date: '2022-08-30 17:45:38',
              },
              BTC: {
                code: 'BTC',
                codein: 'BRL',
                name: 'Bitcoin/Real Brasileiro',
                high: '104.298',
                low: '100',
                varBid: '585',
                pctChange: '0.57',
                bid: '102.571',
                ask: '102.747',
                timestamp: '1661892308',
                create_date: '2022-08-30 17:45:08',
              },
              LTC: {
                code: 'LTC',
                codein: 'BRL',
                name: 'Litecoin/Real Brasileiro',
                high: '284.04',
                low: '267.26',
                varBid: '-6.06',
                pctChange: '-2.15',
                bid: '275.87',
                ask: '276.7',
                timestamp: '1661892305',
                create_date: '2022-08-30 17:45:05',
              },
              EUR: {
                code: 'EUR',
                codein: 'BRL',
                name: 'Euro/Real Brasileiro',
                high: '5.1296',
                low: '5.0195',
                varBid: '0.1015',
                pctChange: '2.02',
                bid: '5.1257',
                ask: '5.1287',
                timestamp: '1661892333',
                create_date: '2022-08-30 17:45:33',
              },
              JPY: {
                code: 'JPY',
                codein: 'BRL',
                name: 'Iene Japonês/Real Brasileiro',
                high: '0.03691',
                low: '0.03622',
                varBid: '0.0006',
                pctChange: '1.66',
                bid: '0.03686',
                ask: '0.03688',
                timestamp: '1661892335',
                create_date: '2022-08-30 17:45:35',
              },
              CHF: {
                code: 'CHF',
                codein: 'BRL',
                name: 'Franco Suíço/Real Brasileiro',
                high: '5.2568',
                low: '5.1581',
                varBid: '0.062',
                pctChange: '1.2',
                bid: '5.2536',
                ask: '5.2551',
                timestamp: '1661892333',
                create_date: '2022-08-30 17:45:33',
              },
              AUD: {
                code: 'AUD',
                codein: 'BRL',
                name: 'Dólar Australiano/Real Brasileiro',
                high: '3.5111',
                low: '3.4565',
                varBid: '0.0378',
                pctChange: '1.09',
                bid: '3.5077',
                ask: '3.5099',
                timestamp: '1661892334',
                create_date: '2022-08-30 17:45:34',
              },
              CNY: {
                code: 'CNY',
                codein: 'BRL',
                name: 'Yuan Chinês/Real Brasileiro',
                high: '0.7407',
                low: '0.7263',
                varBid: '0.0125',
                pctChange: '1.71',
                bid: '0.7403',
                ask: '0.7405',
                timestamp: '1661892302',
                create_date: '2022-08-30 17:45:02',
              },
              ILS: {
                code: 'ILS',
                codein: 'BRL',
                name: 'Novo Shekel Israelense/Real Brasileiro',
                high: '1.5381',
                low: '1.512',
                varBid: '0.023',
                pctChange: '1.52',
                bid: '1.5376',
                ask: '1.5379',
                timestamp: '1661892303',
                create_date: '2022-08-30 17:45:03',
              },
              ETH: {
                code: 'ETH',
                codein: 'BRL',
                name: 'Ethereum/Real Brasileiro',
                high: '8.3',
                low: '7.586',
                varBid: '115.57',
                pctChange: '1.48',
                bid: '7.99484',
                ask: '8.04859',
                timestamp: '1661892310',
                create_date: '2022-08-30 17:45:10',
              },
              XRP: {
                code: 'XRP',
                codein: 'BRL',
                name: 'XRP/Real Brasileiro',
                high: '1.7',
                low: '1.64',
                varBid: '0.01',
                pctChange: '0.3',
                bid: '1.69',
                ask: '1.69',
                timestamp: '1661892307',
                create_date: '2022-08-30 17:45:07',
              },
              DOGE: {
                code: 'DOGE',
                codein: 'BRL',
                name: 'Dogecoin/Real Brasileiro',
                high: '0.324775',
                low: '0.308659',
                varBid: '-0.002815',
                pctChange: '-0.88',
                bid: '0.315994',
                ask: '0.315994',
                timestamp: '1661892305',
                create_date: '2022-08-30 17:45:05',
              },
            },
          },
        ],
        editor: false,
        idToEdit: 0,
      },

    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const buttonDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(buttonDespesa).toBeInTheDocument();

    userEvent.click(buttonDespesa);

    const buttonEdit = screen.getByRole('button', { name: /editar/i });
    const buttonExcluir = screen.getByRole('button', { name: /excluir/i });

    expect(buttonEdit).toBeInTheDocument();
    expect(buttonExcluir).toBeInTheDocument();
  });
  it('Verifica button', async () => {
    const initialState = {
      user: {
        email: userEmail,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const testEmail = screen.getByText('tryber@teste.com');
    const textCoin = screen.getByText('BRL');

    expect(textCoin).toBeInTheDocument();
    expect(testEmail).toBeInTheDocument();
  });
  it('Verifica button', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const currencyOption = screen.getByTestId('currency-input');

    expect(currencyOption).toBeInTheDocument();

    await waitFor(() => expect(currencyOption).toHaveValue('USD'));

    const tagOption = screen.getByTestId('tag-input');

    expect(tagOption).toBeInTheDocument();
    await waitFor(() => expect(tagOption).toHaveValue('Alimentação'));
  });
});
