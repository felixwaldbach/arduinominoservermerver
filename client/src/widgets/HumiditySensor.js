import React, {Component} from 'react';

import '../font/css/custom.css';
import socketIOClient from "socket.io-client";

var LineChart = require("react-chartjs").Line;

class HumiditySensor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: props.style,
            endpoint: 'http://localhost:5000',
            humidity: 0,
            data: {
                labels: ["0"],
                datasets: [
                    {
                        label: "Daily Humidity Data Set",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [0]
                    }
                ]
            },
            counter: 1
        }
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        const app = this;
        socket.on('web_humidity_data', function (data) {
            app.setState({
                humidity: data
            });
            app.addHumidityData(data);
        });
    }

    addHumidityData(humidity) {
        let data = this.state.data;
        let counter = this.state.counter;
        if (counter > 12) {
            console.log("Counter > 5");
            data = {
                labels: ["0"],
                datasets: [
                    {
                        label: "Daily Humidity Data Set",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [0]
                    }
                ]
            };
            counter = 1;
        }
        console.log(data.labels);
        if (data.labels.length > 1 && (data.labels[data.labels.length - 1] === '0')) data.labels.pop();
        data.labels.push((counter * 5).toString());
        counter++;
        data.datasets[0].data.push(humidity);
        this.setState({
            data: data,
            counter: counter
        });
    }

    render() {
        return (
            <div className="humidity-sensor-container">
                <h1>Humidity: {this.state.humidity} %</h1>
                <LineChart data={this.state.data} options={{scaleGridLineColor: "rgba(1.0,1.0,1.0,1.0)"}} width="300"
                           height="100"/>
            </div>
        );
    }
}

export default HumiditySensor;
