import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';

describe('Tests do componente App', () => {
  it('Test se está na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const typeEmail = screen.getByTestId('email-input');

    expect(typeEmail).toBeInTheDocument();

    userEvent.type(typeEmail, 'trybe@trybe.com');

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
  it('Test rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });
  it('', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailValue = 'trybe@trybe.com';
    const passwordValue = '12345678';

    const inputPassword = screen.getByRole('textbox', { name: /password/ });
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
});
