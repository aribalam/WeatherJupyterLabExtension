import {
    ReactWidget
} from '@jupyterlab/apputils'

import React from 'react';

// The Weather data information that need to be displayed
interface WeatherData {
    city: string,
    description: string,
    temperature: number
    humidity: number,
    feelslike: number, 
}

// React Component for Displaying Weather information
function MyComp(props: {
    city: string,
    description: string,
    temperature: number
    humidity: number,
    feelslike: number,
}) {
    return (
        <div className="weather-box">
            <h3>City: {props.city}</h3>
            <h3>{props.description}</h3>
            <h3>Temperature: {props.temperature} &#8451;</h3>
            <h3>Humidity: {props.humidity} %</h3>
            <h3>Feels Like: {props.feelslike} &#8451;</h3>
        </div>
    )
}

// Side Panel containing search form
export class SidePanel extends ReactWidget {

    private inputVal: string;
    private weatherData: WeatherData;

    constructor() {
        super();
        this.id = "sidepanel:id";
        this.title.label = "Side Icon";
        this.inputVal = "";
        this.weatherData = undefined;
    }

    onInputChange(event: any): void {

        // update the value of text with each key change
        this.inputVal = event.target.value;

        // Update the Widget to pass props to Component
        this.update();
    }


    // function to fetch weather information on button click
    async onSubmit(): Promise<void> {

        console.log(this.inputVal);
        
        const resp = await fetch("http://api.weatherstack.com/current?access_key=d0ba0ed5de7d4333fa4bfd50c7bbedb1&query=" + this.inputVal);
        if (resp.ok) {

            const data = await resp.json();
            this.weatherData = ({} as WeatherData);
            this.weatherData.city = data.location.name;
            this.weatherData.description = data.current.weather_descriptions[0];
            this.weatherData.feelslike = data.current.feelslike;
            this.weatherData.humidity = data.current.humidity;
            this.weatherData.temperature = data.current.temperature;

            this.update();
        }

    }
 
    render() {
        return (
            <div className="side-panel-content-wrapper">
                <div className="side-panel-input">
                    
                    <input type="text" onChange={(event: any) => {
                        this.onInputChange(event);
                    }} />

                    <button onClick={() => {
                        this.onSubmit();
                    }}>Search</button>

                </div>
                { this.weatherData ? <MyComp {...this.weatherData} /> : "" }
            </div>
        )
    }

}