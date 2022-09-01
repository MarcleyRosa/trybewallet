import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import mockData from './mockData';
import renderWithRouterAndRedux from './renderWith';

describe('Test component WalletForm.js', () => {
  it('test stado global', () => {
    const initialState = {
      user: {
        email: 'tryber@teste.com',
      },
      wallet: {
        currencies: [
          Object.keys(mockData),
        ],
        expenses: [
          {
            id: 0,
            value: '1',
            description: '1',
            currency: 'USD',
            method: 'Cartão de crédito',
            tag: 'Trabalho',
            exchangeRates: mockData,
          },
        ],
        editor: true,
        idToEdit: 1,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const buttonEdit = screen.getByRole('button', { name: /editar despesa/i });

    const textReal = screen.getAllByText('Real');

    expect(textReal[0]).toBeInTheDocument();

    expect(buttonEdit).toBeInTheDocument();

    userEvent.click(buttonEdit);
  });
});
