import React from "react";

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { composeWithDevTools } from "redux-devtools-extension";

import app from "store/reducers/app";
import order from "store/reducers/order";

function configureStore() {
  const reducer = combineReducers({ app, order });

  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

  return store;
}

function ConfigureProvider({ children }) {
  return <Provider store={configureStore()}>{children}</Provider>;
}

export default ConfigureProvider;
