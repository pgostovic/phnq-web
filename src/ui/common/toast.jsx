import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { wait } from 'phnq-lib';
import notifyState from '../../state/notify';

const ToastItems = styled.ul`
  position: fixed;
  right: 20px;
  bottom: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ToastItem = styled.li`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 10px 0 0;
  background-color: #ccc;
  padding: 20px;
  white-space: nowrap;
  opacity: 0;

  transform: translateY(-${props => props.index * 80}px);
  transition: transform 0.3s ease;

  animation: ${fadeIn} 0.3s forwards;
  animation-delay: 0.3s;

  &.removed {
    animation: ${fadeOut} 0.3s forwards;
  }
`;

@notifyState.map()
class Toast extends Component {
  static propTypes = {
    toast: PropTypes.func.isRequired,
    toasts: PropTypes.arrayOf(PropTypes.shape({ message: PropTypes.string })).isRequired,
    test: PropTypes.bool,
  };

  static defaultProps = {
    test: false,
  };

  async componentDidMount() {
    const { test, toast } = this.props;

    if (test) {
      await wait(1000);
      toast('Making some toast');
      await wait(3000);
      toast('Here is some more stuff...');
      await wait(1000);
      toast('Yabba dabba doo!!!');
    }
  }

  render() {
    const { toasts } = this.props;

    return (
      <ToastItems>
        {toasts.map((toast, i) => (
          <ToastItem key={toast.id} index={i} className={!toast.active && 'removed'}>
            {toast.message}
          </ToastItem>
        ))}
      </ToastItems>
    );
  }
}

export default Toast;
