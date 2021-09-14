import React from 'react';
import { Redirect } from 'react-router';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick(event) {
    event.preventDefault();
    const { name } = this.state;
    const user = { name };
    this.setState({ loading: true });
    await createUser(user);
    this.setState({ redirect: true, loading: false });
  }

  render() {
    const NAME_MIN_LENGHT = 3;
    const { name, redirect, loading } = this.state;

    if (loading) return <Loading />;

    if (redirect) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        Login
        <div>
          <input
            data-testid="login-name-input"
            type="text"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ name.length < NAME_MIN_LENGHT }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </div>

    );
  }
}

export default Login;
