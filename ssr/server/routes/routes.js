import React from 'react'
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import { Router, Route, ServerRouter, StaticRouter } from 'react-router';

import commonRoutes from '../../../src/routes/routes';
import { matchRoutes, renderRoutes } from 'react-router-config'
import Html from '../template/index';
import { createStore, applyMiddleware, compose } from 'redux';
import { getCookiesMiddleware } from 'redux-cookies';
import rootReducer from '../../../src/reducers';

import Cookies from 'cookies';

export default function routes( req, res, next ) {
    webpackIsomorphicTools.refresh();

    const branch = matchRoutes(commonRoutes, req.url )
    const context = {};
    const routes  = commonRoutes;

    const store   = createStore( rootReducer, 
                                applyMiddleware(getCookiesMiddleware(new Cookies( req, res))) );
    

    const assets = webpackIsomorphicTools.assets();

    console.log(assets);
    if( branch.length == 0 ) {
        return next();
    }

    res.send(renderToString(
        <Html component={branch[0].route.component} state={store.getState()} store={store} assets={assets}/>
    ) );
}