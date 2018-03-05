import React from 'react';

import { connect } from 'react-redux'

class Home extends React.Component {
    state = {
        a: 'State rendered from SSR'
    };

    changeState() {
        this.setState( {a:`Testing state change on the client side`});
        this.count++;
    }

    componentDidMount() {
        setTimeout(() => {
            this.changeState();
        }, 4000);
    }
    render() {        
        return <h1 style={{ color: '#2196f3', textAlign: 'center' }}>{this.state.a}</h1>        
    }
}

function mapStateToProps(state) {
    return {
        a: state.a,
    };
}

export default connect(mapStateToProps)(Home);