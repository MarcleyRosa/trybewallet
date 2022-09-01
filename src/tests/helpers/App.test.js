import { screen } from '@testing-library/react';
import fetchMockJest from 'fetch-mock-jest';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';
import mockData from './mockData';

describe('Tests do componente App', () => {
  it('Test se está na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const typeEmail = screen.getByTestId('email-input');

    expect(typeEmail).toBeInTheDocument();

    userEvent.type(typeEmail, 'trybe@trybe.com');

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
  it('Test rota /carteira', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const buttonAdcDesp = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(buttonAdcDesp).toBeInTheDocument();

    userEvent.click(buttonAdcDesp);

    // jest.fn().mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mockData),
    // });

    // global.fetch = jest.fn(async () => Promise.resolve({
    //   json: async () => Promise.resolve(mockData),
    // }));

    // await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
    // await waitFor(() => expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all'));

    fetchMockJest.getOnce('https://economia.awesomeapi.com.br/json/all', mockData);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });
  it('', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailValue = 'trybe@trybe.com';
    const passwordValue = '12345678';

    const inputPassword = screen.getByRole('textbox', { name: /password/i });
    const inputEmail = screen.getByRole('textbox', { name: /email/i });

    userEvent.type(inputEmail, emailValue);
    userEvent.type(inputPassword, passwordValue);

    expect(inputEmail).toHaveValue(emailValue);
    expect(inputPassword).toHaveValue(passwordValue);

    const buttonLogin = await screen.findByRole('button', { name: /entrar/i });

    expect(buttonLogin).toBeInTheDocument();

    userEvent.click(buttonLogin);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });
  it('test editar despesa', () => {
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

    const buttonEdit = screen.getAllByRole('button', { name: /editar/i });
    console.log(buttonEdit);

    expect(buttonEdit[1]).toBeInTheDocument();

    userEvent.click(buttonEdit[1]);
  });
});
