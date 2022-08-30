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
  it('', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });
});
