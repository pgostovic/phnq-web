import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { boundMethod as bound } from 'autobind-decorator';
import View from './view';
import searchState from '../../../state/search';

@withRouter
@searchState.map()
class Search extends Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    searchText: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({ match: PropTypes.string, source: PropTypes.shape({ name: PropTypes.string }) })
    ).isRequired,
    selectedResult: PropTypes.shape({ match: PropTypes.string, source: PropTypes.shape({ name: PropTypes.string }) }),
    selectResult: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedResult: null,
  };

  @bound
  onNavigateResults(op) {
    const {
      searchResults,
      selectedResult,
      selectResult,
      history: { push },
    } = this.props;

    let selIdx = searchResults.indexOf(selectedResult);

    switch (op) {
      case 'choose':
        if (selectedResult) {
          push(pathForSearchResult(selectedResult));
        }
        return;

      case 'previous':
        selIdx -= 1;
        break;

      case 'next':
        selIdx += 1;
        break;

      default:
    }

    selIdx %= searchResults.length;
    if (selIdx < 0) {
      selIdx = searchResults.length - 1;
    }

    selectResult(searchResults[selIdx]);
  }

  render() {
    const { search } = this.props;

    return <View {...this.props} onSearch={search} onNavigateResults={this.onNavigateResults} />;
  }
}

export const pathForSearchResult = searchResult => {
  switch (searchResult.source.type) {
    case 'artist':
      return `/artists/${searchResult.source.mbid}`;

    default:
  }
  return null;
};

export default Search;
