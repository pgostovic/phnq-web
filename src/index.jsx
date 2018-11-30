import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import UI from './ui';

const App = hot(module)(() => <UI />);

ReactDOM.render(<App />, document.getElementById('app'));
