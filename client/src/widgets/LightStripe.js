import React, {Component} from 'react';

import '../font/css/custom.css';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import socketIOClient from "socket.io-client";

const styles = {
    root: {
        flexGrow: 1,
    },
};

class LightStripe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: props.style,
            lightData: 0,
            endpoint: 'http://localhost:5000'
        }
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        const app = this;
        socket.on('web_softpot_data', function (data) {
            app.setState({
                lightData: data
            });
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root + " light-stripe-container"}>
<<<<<<< HEAD
                <h1>Softpot Data: </h1>
                <LinearProgress variant="determinate" value={this.state.lightData / 7}/>
                <p>{this.state.lightData}</p>
            </div>
        );
    }
}

LightStripe.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LightStripe);
