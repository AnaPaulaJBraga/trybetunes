import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">{ user.name }</div>
        <Link data-testid="link-to-search" to="/search"> Pesquisar </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favoritos </Link>
        <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
      </header>
    );
  }
}

export default Header;
