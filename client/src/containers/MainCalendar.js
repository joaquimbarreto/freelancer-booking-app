import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import GoogleCalendarApi from "../components/GoogleCalendarApi";
// import NewCalendarEvent from "../components/NewCalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class MainCalendar extends Component {
	state = {
		events: [],
		selectedSlot: [],
		selectedEvent: []
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

	handleSelectSlot = event => {
		this.setState({ selectedSlot: event });
	};

	handleNewEvent = event => {
		this.setState({
			events: [...this.state.events, event]
		});
	};

	handleSelectEvent = event => {
		console.log(event);
		this.setState({
			selectedEvent: event
		});
	};

	render() {
		return (
			<div className="App">
				<p>
					<strong>Click On a Day to Book</strong>
				</p>

				<GoogleCalendarApi
					handleEvents={this.handleEvents}
					selectedSlot={this.state.selectedSlot}
					newEvent={this.handleNewEvent}
					selectedEvent={this.state.selectedEvent}
				/>
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="month"
					events={this.state.events}
					style={{ height: "100vh" }}
					onSelectSlot={this.handleSelectSlot}
					onSelectEvent={this.handleSelectEvent}
					selectable={true}
				/>
			</div>
		);
	}
}

export default MainCalendar;
