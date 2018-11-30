import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DefaultLayout from '../../layouts/defaultLayout';
import artistState from '../../../state/artist';
import { modelPropType } from '../../../api';

const Title = styled.h1`
  font-size: x-large;
  font-weight: bold;
`;

const P = styled.p`
  margin: 20px 0;
  line-height: 1.5;
`;

@artistState.map()
class Home extends Component {
  static propTypes = {
    artist: modelPropType('Artist'),
    fetchArtist: PropTypes.func.isRequired,
  };

  static defaultProps = {
    artist: null,
  };

  componentDidMount() {
    const { fetchArtist } = this.props;
    fetchArtist('name:Rush');
  }

  render() {
    const { artist } = this.props;

    if (!artist) {
      return null;
    }

    console.log('ARTIST ', artist);

    return (
      <DefaultLayout>
        <Title>This is Home</Title>
        <P>{artist.bio}</P>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dolor quis mauris vestibulum laoreet. Quisque
          ut risus sed dui bibendum ullamcorper. Phasellus facilisis quam lobortis est elementum venenatis. Vestibulum
          condimentum nibh odio, sed fringilla purus pellentesque in. Proin pretium sodales diam, vel condimentum enim
          sagittis non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras
          nunc velit, euismod vitae egestas quis, maximus non ex. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Curabitur et semper orci. Maecenas ac dui feugiat, mollis mi
          vitae, luctus velit. Donec ac nunc ex. Duis tincidunt diam ac pulvinar scelerisque. Curabitur auctor tincidunt
          est. Duis a ex gravida, hendrerit leo sed, maximus ante. Interdum et malesuada fames ac ante ipsum primis in
          faucibus.
        </P>
        <P>
          Phasellus quis vestibulum odio. Nunc pretium, sapien eget consequat maximus, elit risus euismod orci, eu
          fermentum dui ante id nulla. Ut venenatis ligula quis vulputate consectetur. Duis dignissim elit ligula, eget
          interdum nisl ultrices at. Curabitur purus mauris, elementum eget neque a, imperdiet molestie augue. Etiam
          lacinia ligula id ligula aliquet convallis sit amet sit amet nisl. Sed eget ipsum porttitor, consectetur risus
          id, elementum mauris. Aliquam maximus porttitor velit at faucibus.
        </P>
        <P>
          Pellentesque tincidunt dignissim ante non sodales. Pellentesque et nunc ac eros sodales elementum. Duis
          malesuada eros sem. Cras elementum orci diam, id malesuada dolor sodales quis. Quisque a dolor quis felis
          gravida blandit. Cras commodo erat convallis elementum feugiat. Aenean consequat condimentum sem nec
          imperdiet. Aenean hendrerit nunc at elit ornare posuere. Suspendisse potenti. Nulla facilisi. Sed finibus nisl
          eget facilisis cursus. Pellentesque non massa in neque dignissim vulputate eget quis velit. Proin auctor
          consectetur est, a vestibulum odio congue eget. Fusce condimentum vestibulum est, in efficitur ante lacinia
          in.
        </P>
        <P>
          Maecenas pretium quam vitae congue scelerisque. Sed sodales maximus auctor. In accumsan metus vel aliquam
          laoreet. Fusce tempor dui non erat tincidunt hendrerit. Sed elit nunc, fermentum vitae fermentum ac, laoreet
          eget mauris. Vestibulum nec condimentum enim. Mauris vel orci nibh. Ut nibh nisl, mattis pellentesque dui
          eget, vestibulum facilisis magna. Sed vel risus sit amet nunc facilisis rhoncus. Ut tellus libero, elementum
          at justo tempor, fermentum euismod elit. Cras quis iaculis neque.
        </P>
        <P>
          Vestibulum venenatis convallis purus, sit amet tristique nisl malesuada in. Ut non consequat est. In suscipit
          massa in suscipit luctus. Nulla tristique ante vel lectus egestas, sit amet laoreet quam rhoncus. Nam rutrum
          molestie nisi viverra hendrerit. Nam vehicula semper velit, ac bibendum libero ornare vel. Suspendisse egestas
          dignissim tincidunt. In scelerisque orci commodo egestas consectetur. Aliquam volutpat porta eros sit amet
          aliquam. Pellentesque rhoncus purus ipsum, sit amet dictum urna facilisis vel.
        </P>
      </DefaultLayout>
    );
  }
}

export default Home;
