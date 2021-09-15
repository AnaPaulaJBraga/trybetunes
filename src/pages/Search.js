import React from 'react';
import AlbumCard from '../Components/AlbumCard';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      artistSearched: '',
      loading: false,
      albums: [],
      response: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchPesquisa = this.fetchPesquisa.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async fetchPesquisa(artist) {
    this.setState({ loading: true, artistSearched: artist });
    const albums = await searchAlbumsAPI(artist);
    if (albums !== null) {
      this.setState({ albums, artist: '', loading: false, response: true });
    }
  }

  render() {
    const { artist, artistSearched, loading, albums, response } = this.state;
    const NAME_MIN_LENGHT = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            Nome da banda ou artista:
            <input
              data-testid="search-artist-input"
              id="search-artist-input"
              name="artist"
              value={ artist }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ artist.length < NAME_MIN_LENGHT }
            onClick={ () => this.fetchPesquisa(artist) }
          >
            Pesquisar
          </button>
        </form>
        { loading && <Loading /> }
        { response && <AlbumCard data={ { albums, artistSearched } } />}
      </div>
    );
  }
}
export default Search;
