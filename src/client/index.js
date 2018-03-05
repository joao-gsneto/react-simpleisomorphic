import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Route, Switch } from 'react-router';
import rootReducer from '../reducers';
import { createStore } from 'redux';
import { getCookiesMiddleware } from 'redux-cookies';
import Cookies from 'cookies';
import Home from '../containers/Home';
import routes from '../routes/routes';

const preloadedState = window.__PRELOADED_STATE__;


function configureStore(initialState) {
    const store = createStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

const store = configureStore(preloadedState);

if( module.hot ) {
    module.hot.accept( (e) => {
        console.log( e );
    });
}

hydrate(
    <Provider store={store}>
        <Router>
            
            <Switch>
                <Route path="*" exact component={routes[0].component} />
                {routes.forEach( ( x )=> {
                    <Route path="*" exact component={x.component} />
                })}
            </Switch>

        </Router>
    </Provider>,
    document.getElementById('app'),
);
