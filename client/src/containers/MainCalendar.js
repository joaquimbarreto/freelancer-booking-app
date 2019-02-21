import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import GoogleCalendarApi from "../components/GoogleCalendarApi";
import NewCalendarEvent from "../components/NewCalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class MainCalendar extends Component {
	state = {
		events: []
	};

	handleEvents = events => {
		const formattedEvents = events.map(event => {
			return {
				start: event.start.dateTime,
				end: event.end.dateTime,
				title: event.summary
			};
		});
		this.setState({ events: formattedEvents });
	};

	render() {
		return (
			<div className="App">
				<GoogleCalendarApi handleEvents={this.handleEvents} />
				<NewCalendarEvent />
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

export default MainCalendar;
