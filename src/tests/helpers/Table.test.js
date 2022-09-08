import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import fetchMock from 'fetch-mock-jest';
import fetchMockJest from 'fetch-mock-jest';
import mockData from './mockData';
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
          Object.keys(mockData),
        ],
        expenses: [
          {
            id: 0,
            value: '1',
            description: 'test',
            currency: 'USD',
            method: 'Cartão de crédito',
            tag: 'Alimentação',
            exchangeRates: mockData,
          },
        ],
        editor: false,
        idToEdit: 0,
      },

    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const buttonDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(buttonDespesa).toBeInTheDocument();

    fetchMockJest.getOnce('https://economia.awesomeapi.com.br/json/all', mockData);

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

    const testEmail = screen.getByText(/tryber@teste.com/i);
    const textCoin = screen.getByText(/BRL/i);

    expect(textCoin).toBeInTheDocument();
    expect(testEmail).toBeInTheDocument();
  });
  it('Verifica button', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(store.getState().wallet.editor).toBeFalsy();

    const tagOption = screen.getByTestId('tag-input');

    expect(tagOption).toBeInTheDocument();
    await waitFor(() => expect(tagOption).toHaveValue('Alimentação'));

    const buttonAdc = screen.getByRole('button', { name: /adicionar despesa/i });

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    userEvent.click(buttonAdc);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
    expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
  it('Verifica todos os select', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(screen.getByRole('option', { name: /alimentação/i }).selected).toBeTruthy();

    expect(screen.getByRole('option', { name: /alimentação/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /lazer/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /trabalho/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /transporte/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /saúde/i })).toBeInTheDocument();
  });
  it('Verifica todos os select', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(screen.getByRole('option', { name: /dinheiro/i }).selected).toBeTruthy();

    expect(screen.getByRole('option', { name: /dinheiro/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /cartão de crédito/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /cartão de débito/i })).toBeInTheDocument();
  });
});
