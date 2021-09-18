import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange() {
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(music);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { music } = this.props;
    const { loading } = this.state;

    return (
      <div>
        { loading && <Loading /> }
        <label
          data-testid={ `checkbox-music-${music.trackId}` }
          htmlFor={ music.trackId }
        >
          Favorita
          <input
            name="favorite"
            type="checkbox"
            id={ music.trackId }
            onChange={ this.handleChange }
          />
        </label>

        <section>
          <h3>
            { music.trackName }
          </h3>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </section>
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
