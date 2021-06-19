import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import aws_exports from './aws-exports'
import Amplify from 'aws-amplify'

Amplify.configure(aws_exports)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

