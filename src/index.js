import React from 'react';
import ReactDOM from 'react-dom/client.js';
import './index.css';
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import App from './app'
import { createBrowserHistory } from 'history';
import configureStore from './user/api/configureStore';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';


const baseUrl = process.env.PUBLIC_URL;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
   
   
  </React.StrictMode>
);







 
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//reportWebVitals();

