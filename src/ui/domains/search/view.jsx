import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { boundMethod as bound } from 'autobind-decorator';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DefaultLayout from '../../layouts/defaultLayout';
import { pathForSearchResult } from '.';

const SearchView = styled(DefaultLayout)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  height: 40px;
  font-size: 20px;
  padding: 0 10px;
  box-sizing: border-box;
`;

const SearchResults = styled.div`
  width: 100%;
  max-width: 600px;
`;

const SearchResult = styled(Link)`
  display: flex;
  align-items: flex-end;
  text-decoration: none;
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  color: inherit;

  &.selected {
    background-color: #eee;
  }
`;

const Match = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px 0;
`;

const Canonical = styled.span`
  font-size: 11px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px 0;
`;

const Comment = styled.span`
  flex: 1;
  text-align: right;
  font-size: 11px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px 0 5px 20px;
  min-width: 100px;

  &:empty {
    display: none;
  }
`;

class View extends Component {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    onNavigateResults: PropTypes.func.isRequired,
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({ match: PropTypes.string, source: PropTypes.shape({ name: PropTypes.string }) })
    ).isRequired,
    selectedResult: PropTypes.shape({ match: PropTypes.string, source: PropTypes.shape({ name: PropTypes.string }) }),
  };

  static defaultProps = {
    selectedResult: null,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  @bound
  keyDown(event) {
    const { onNavigateResults } = this.props;

    switch (event.keyCode) {
      case 13:
        onNavigateResults('choose');
        break;

      case 38: // up
        onNavigateResults('previous');
        break;

      case 40: // down
        onNavigateResults('next');
        break;

      default:
    }
  }

  render() {
    const { searchText, onSearch, searchResults, selectedResult } = this.props;

    return (
      <SearchView>
        <SearchInput value={searchText} onChange={({ target: { value } }) => onSearch(value)} placeholder="Search..." />
        <SearchResults>
          {searchResults.map(searchResult => (
            <SearchResult
              key={searchResult.source.mbid}
              className={searchResult === selectedResult && 'selected'}
              to={pathForSearchResult(searchResult)}
            >
              <Match>{searchResult.match}</Match>
              {searchResult.match !== searchResult.source.name && (
                <Canonical>
                  &nbsp;(
                  {searchResult.source.name})
                </Canonical>
              )}
              <Comment>{searchResult.source.comment || searchResult.source.tags.slice(0, 5).join(', ')}</Comment>
            </SearchResult>
          ))}
        </SearchResults>
      </SearchView>
    );
  }
}

export default View;
