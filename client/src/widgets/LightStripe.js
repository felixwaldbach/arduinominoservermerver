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
            lightData: 30,
            endpoint: 'http://localhost:5000'
        }
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        const app = this;
        socket.on('ui_lightstripe_data', function (data) {
            app.setState({
                lightData: data.lightData
            });
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root + " light-stripe-container"}>
                <h1>Lighstripe Data: </h1>
                <LinearProgress variant="determinate" value={this.state.lightData}/>
                <p>{this.state.lightData}</p>
            </div>
        );
    }
}

LightStripe.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LightStripe);
