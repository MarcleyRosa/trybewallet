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
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const descriptionValue = 'Dólar Americano/Real Brasileiro';

    const buttonEdit = screen.getByRole('button', { name: /editar despesa/i });

    const textReal = screen.getAllByText('Real');

    const inputDescription = screen.getByLabelText('Descrição da despesa:');

    expect(inputDescription).toBeInTheDocument();

    userEvent.type(inputDescription, descriptionValue);

    expect(inputDescription).toHaveValue(descriptionValue);

    expect(textReal[0]).toBeInTheDocument();

    expect(buttonEdit).toBeInTheDocument();

    userEvent.click(buttonEdit);

    const buttonDelete = screen.getAllByRole('button', { name: /excluir/i });

    expect(buttonDelete[0]).toBeInTheDocument();

    userEvent.click(buttonDelete[0]);
  });
});
