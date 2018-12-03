import React, {Component} from 'react';

import '../font/css/custom.css';
import socketIOClient from "socket.io-client";

class TemperatureSensor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: props.style,
            endpoint: 'http://localhost:5000',
            temperature: 0
        }
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        const app = this;
        socket.on('web_temperature_data', function (data) {
            app.setState({
                temperature: data
            });
        });
    }

    render() {
        return (
            <div className="temperature-sensor-container">
                <h1>Temperature:</h1>
                <p>{this.state.temperature} ° C</p>
            </div>
        );
    }
}

export default TemperatureSensor;
