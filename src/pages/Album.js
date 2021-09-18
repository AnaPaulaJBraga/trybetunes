import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from './Loading';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: true,
    };

    this.fetchMusic = this.fetchMusic.bind(this);
  }

  componentDidMount() {
    this.fetchMusic();
  }

  async fetchMusic() {
    const { match: { params: { id } } } = this.props;
    const fetchMusicsAPI = await getMusics(id);
    this.setState({
      musics: fetchMusicsAPI,
      loading: false,
    });
  }

  render() {
    const { musics, loading } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <div data-testid="page-album">
        <Header />

        <div>
          <section data-testid="album-name">
            <img src={ musics[0].artworkUrl100 } alt={ musics[0].artistName } />
            <h2>{ musics[0].collectionName }</h2>
            <h3 data-testid="artist-name">{ musics[0].artistName }</h3>
          </section>
        </div>

        <div>
          {musics.map((music, index) => {
            if (index > 0) {
              return <MusicCard key={ music.trackId } music={ music } />;
            }
            return null; //  "https://stackoverflow.com/questions/45014094/how-do-i-fix-expected-to-return-a-value-at-the-end-of-arrow-function-warning"
          })}
        </div>

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
