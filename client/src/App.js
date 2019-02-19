import React, { Component } from "react";
import "./App.css";
import Calendar from "react-big-calendar";
import moment from "moment";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import GoogleCalendarApi from "./components/GoogleCalendarApi";

const localizer = Calendar.momentLocalizer(moment);

class App extends Component {
	state = {
		events: [
			{
				start: new Date(),
				end: new Date(moment().add(1, "days")),
				title: "Freelance Work"
			}
		]
	};

	render() {
		return (
			<div className="App">
				<GoogleCalendarApi events={this.state.events} />
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="month"
					events={this.state.events}
					style={{ height: "100vh" }}
				/>
			</div>
		);
	}
}

export default App;
