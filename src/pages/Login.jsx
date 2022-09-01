import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmailAction } from '../redux/actions';
// import store from '../redux/store';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatch } = this.props;

    dispatch(saveEmailAction({ email }));

    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const minimumPassword = 6;
      if (email.includes('.com') && password.length >= minimumPassword) {
        this.setState({
          isDisable: false,
        });
      } else {
        this.setState({
          isDisable: true,
        });
      }
    });
  };

  render() {
    const { isDisable } = this.state;
    return (
      <div>
        <form action="" onSubmit={ this.handleSubmit }>
          <label htmlFor="emails">
            {' '}
            Email:
            <input
              onChange={ this.handleChange }
              type="email"
              name="email"
              id="emai"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="passwords">
            Password:
            <input
              onChange={ this.handleChange }
              type="text"
              data-testid="password-input"
              name="password"
              id="passwords"
            />
          </label>
          <button type="submit" disabled={ isDisable }>Entrar</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.arrayOf,
  }).isRequired,
};

export default connect()(Login);
