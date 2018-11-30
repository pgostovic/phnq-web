import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorBgHeader } from '../style/variables';

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 50px;
  background-color: ${colorBgHeader};
`;

const Body = styled.div`
  flex: 1;
`;

const DefaultLayout = ({ children, className }) => (
  <Root>
    <Header>Home</Header>
    <Body className={className}>{children}</Body>
  </Root>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DefaultLayout.defaultProps = {
  className: null,
};

export default DefaultLayout;
