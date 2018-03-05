import errorHandler from 'errorhandler';
import app from './app.ts';
import * as path from 'path'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import WebpackIsomorphicToolsConfig from './../../webpack/webpack-isomorphic-tools';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

const rootDir = path.resolve(__dirname, '../../');

const server = global.webpackIsomorphicTools = new WebpackIsomorphicTools(WebpackIsomorphicToolsConfig)
    .server(rootDir, () => {
        app.listen(app.get("port"), () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                app.get("port"),
                app.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
    });

module.exports = server;