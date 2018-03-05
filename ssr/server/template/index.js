import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { renderToString } from 'react-dom/server'


class Html extends Component {
    javascripts() {
        const js = this.props.assets.javascript || {};
        const mainJS = js.main || '';
        const path =
            (mainJS.length) ? `${mainJS.replace('./dist', '/dist')}` : '/dist/main.js';

            
        return <script src={path} async></script>;

    }

    styles() {

    }

    metas() {

    }

    createComponentFactory() {
        const el = React.createElement(this.props.component, { store: this.props.store });
        return { __html: renderToString( el ) };
    }

    render() {
        const { assets, component, store, state } = this.props

        const html =
            (
                <html lang="en-us">
                    <head>
                        <meta charSet="utf-8" />
                        <title>React simples App Server Side rendered</title>

                    </head>

                    <body>

                        <div id="app" dangerouslySetInnerHTML={this.createComponentFactory()} />
                        <div id="content"></div>

                        {this.javascripts()}
                    </body>
                </html>
            )

        return html
    }
}

function mapStateToProps(state) {
    return {
        a: state.a,
    };
}

export default connect( mapStateToProps )(Html);