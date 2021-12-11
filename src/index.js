import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import theme from './theme';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import mortgageReducer from './store/reducers/mortgage';
import appReducer from './store/reducers/app';
import personalReducer from './store/reducers/personal';
import { ThemeProvider } from '@material-ui/core';

const rootReducer = combineReducers({
  mortgage: mortgageReducer,
  app: appReducer,
  personal: personalReducer,
});

// uncomment next line to enable redux dev tools
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer
  //uncomment next line to enable redux dev tools
  //composeEnhancers()
);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
