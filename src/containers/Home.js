import React from 'react';

import { connect } from 'react-redux'

class Home extends React.Component {
    render() {        
        return <h1>{this.props.a}</h1>        
    }
}

function mapStateToProps(state) {
    return {
        a: state.a,
    };
}

export default connect(mapStateToProps)(Home);