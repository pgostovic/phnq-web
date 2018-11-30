import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import reset from './reset.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-size: medium;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: sans-serif;
  }
`;

const Style = ({ children }) => [<GlobalStyle key="global-style" />, children];

Style.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Style;
