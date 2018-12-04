import React, {Component} from 'react';

import '../font/css/custom.css';
import socketIOClient from "socket.io-client";

var LineChart = require("react-chartjs").Line;

class TemperatureSensor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: props.style,
            endpoint: 'http://localhost:5000',
            temperature: 0,
            data: {
                labels: ["0", "10", "20", "30", "40", "50", "60"],
                datasets: [
                    {
                        label: "Daily Temperature Data Set",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [0]
                    }
                ]
            }
        }
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        const app = this;
        socket.on('web_temperature_data', function (data) {
            app.setState({
                temperature: data
            });
            app.addTemperatureData(data);
        });
    }

    addTemperatureData(temperature) {
        let data = this.state.data;
        data.datasets[0].data.push(temperature);
        this.setState({
            data: data
        });
    }

    render() {
        return (
            <div className="temperature-sensor-container">
                <h1>Temperature: {this.state.temperature} ° C</h1>
                <LineChart data={this.state.data} width="300" height="125"/>
            </div>
        );
    }
}

export default TemperatureSensor;
