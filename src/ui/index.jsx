import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './domains/search';
import ArtistDetails from './domains/artistDetails';
import Style from './style';
import notifyState from '../state/notify';
import artistState from '../state/artist';
import searchState from '../state/search';
import { modelForName } from '../api';

@notifyState.provider
@artistState.provider
@searchState.provider
class UI extends Component {
  render() {
    return (
      <Router>
        <Style>
          <Route exact path="/" render={() => <Redirect to="/search" />} />
          <Route path="/search" component={Search} />
          <Route path="/artists/:mbid" component={ArtistDetails} />
        </Style>
      </Router>
    );
  }
}

export default UI;

export const pathForModel = model => {
  if (model instanceof modelForName('Artist')) {
    return `/artists/${model.id}`;
  }
  if (model instanceof modelForName('Tag')) {
    return `/tags/${model.id}`;
  }
  if (model instanceof modelForName('Album')) {
    return `/albums/${model.id}`;
  }
  // throw new Error('No path for model');
  return '#';
};
