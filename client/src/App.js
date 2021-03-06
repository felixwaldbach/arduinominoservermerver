import React, {Component} from 'react';
import logo from './logo.svg';
import './font/css/grid.css';
import './App.css';
import LightStripe from "./widgets/LightStripe";
import TemperatureSensor from "./widgets/TemperatureSensor";
import HumiditySensor from "./widgets/HumiditySensor";

class App extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({post: this.state.post}),
        });
        const body = await response.text();
        this.setState({responseToPost: body});
    };

    render() {
        return (
            <div className="container">

                <div className="upper-row">
                    <div id="widget">
                        <LightStripe/>
                    </div>
                    <div id="widget">
                        <TemperatureSensor/>
                    </div>
                    <div id="widget">
                        <HumiditySensor/>
                    </div>
                </div>

            </div>

        );
    }
}

export default App;