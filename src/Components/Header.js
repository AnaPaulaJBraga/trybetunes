import React from 'react';
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
        <h2 data-testid="header-user-name">
          { user.name }
        </h2>
      </header>
    );
  }
}

export default Header;
