import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

export default function configureStore(initialState={}) {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const composedEnhancers = composeWithDevTools(middlewareEnhancer)
  
    
    const store = createStore(rootReducer, initialState, composedEnhancers)
    
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
      }
    return store;
}
