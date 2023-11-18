
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import userReducer from './reducers/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  user: userReducer,  
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      // ...middleware (if any, like redux-thunk or redux-saga)
    )    
  )
);

export default store;
