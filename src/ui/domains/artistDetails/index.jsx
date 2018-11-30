import React, { Component } from 'react';
import PropTypes from 'prop-types';
import artistState from '../../../state/artist';
import View from './view';
import { modelPropType } from '../../../api';

@artistState.map()
class ArtistDetails extends Component {
  static propTypes = {
    artist: modelPropType('Artist'),
    match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string, imageId: PropTypes.string }) }).isRequired,
    clearArtist: PropTypes.func.isRequired,
    fetchArtist: PropTypes.func.isRequired,
  };

  static defaultProps = {
    artist: null,
  };

  componentDidMount() {
    const {
      clearArtist,
      fetchArtist,
      match: {
        params: { mbid },
      },
    } = this.props;

    clearArtist();
    fetchArtist(mbid);
  }

  render() {
    const { artist } = this.props;

    return <View artist={artist} />;
  }
}

export default ArtistDetails;
