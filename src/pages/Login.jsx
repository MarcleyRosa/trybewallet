import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
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
        <form className="login-form" action="" onSubmit={ this.handleSubmit }>
          <h3>Login</h3>
          <div>
            <label htmlFor="emails">
              Email:
              <input
                onChange={ this.handleChange }
                type="email"
                name="email"
                id="emails"
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
          </div>
          <button
            className={ isDisable ? 'disabled' : 'button-login' }
            type="submit"
            disabled={ isDisable }
          >
            <span className="span">Entrar</span>

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default connect()(Login);
