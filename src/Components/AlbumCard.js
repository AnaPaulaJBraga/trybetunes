import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { data: { albums, artistSearched } } = this.props;
    if (albums.length === 0) {
      return (<p> Nenhum álbum foi encontrado </p>);
    }
    return (
      <div>
        <h2>{ `Resultado de álbuns de: ${artistSearched} `}</h2>
        { albums.map(({
          collectionId,
          artistName,
          collectionName,
          artworkUrl100,
        }) => (
          <div key={ collectionId }>
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              <img src={ artworkUrl100 } alt="imagem album" />
              <h4>{ collectionName }</h4>
              <h4>{ artistName }</h4>
            </Link>
          </div>

        ))}

      </div>
    );
  }
}
AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }),
}.isRequired;

export default AlbumCard;
