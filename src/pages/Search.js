import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      search: value,
    });
  }

  render() {
    const { search } = this.state;
    const NAME_MIN_LENGHT = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            data-testid="search-artist-input"
            name="search"
            value={ search }
            type="text"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ search.length < NAME_MIN_LENGHT }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
