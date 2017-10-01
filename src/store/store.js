/**
 * 创建Store
 */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import ReduxDevTool from '../devtools/ReduxDevTool';
import { Map } from 'immutable';

const history = createHistory();

const middleware = routerMiddleware(history);

const enhancer = compose(
    applyMiddleware(
        thunk,
        middleware,
    ),
    ReduxDevTool.instrument(),
);

function configureStore(initialState = Map()) {
    const store = createStore(rootReducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}

export { history, configureStore };
