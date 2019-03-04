import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import GoogleCalendarApi from "../components/GoogleCalendarApi";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class MainCalendar extends Component {
	state = {
		events: [],
		selectedSlot: null,
		selectedEvent: null
	};

	handleEvents = events => {
		const { user } = this.props;
		const formattedEvents = events.map(event => {
			return {
				start: event.start.dateTime,
				end: event.end.dateTime,
				title: event.summary.includes(`Client: ${user.company}`)
					? event.summary
					: "Busy",
				id: event.id
			};
		});
		this.setState({ events: formattedEvents });
	};

	handleSelectSlot = event => {
		// if event exits {alert(Cannot book on this day)} else
		this.setState({
			selectedSlot: event,
			selectedEvent: null
		});
	};

	handleNewEvent = event => {
		const newBooking = {
			start: event.start.dateTime,
			end: event.end.dateTime,
			title: event.summary
		};
		this.setState({
			events: [...this.state.events, newBooking],
			selectedSlot: null
		});
	};

	handleSelectEvent = event => {
		// if event is not of user {alert(Cannot edit this event)}
		this.setState({
			selectedEvent: event,
			selectedSlot: null
		});
	};

	handleDeleteEvent = event => {
		this.setState({
			events: this.state.events.filter(events => events.start !== event.start),
			selectedEvent: null
		});
	};

	render() {
		const { username, user } = this.props;
		return (
			<div className="App">
				<p>
					<strong>Click On a Day to Book</strong>
				</p>
				<p>Or select event to cancel</p>

				<GoogleCalendarApi
					handleEvents={this.handleEvents}
					selectedSlot={this.state.selectedSlot}
					newEvent={this.handleNewEvent}
					selectedEvent={this.state.selectedEvent}
					username={username}
					user={user}
					deleteEvent={this.handleDeleteEvent}
				/>
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="month"
					events={this.state.events}
					style={{ height: "600px" }}
					onSelectSlot={this.handleSelectSlot}
					onSelectEvent={this.handleSelectEvent}
					selectable={true}
				/>
			</div>
		);
	}
}

export default MainCalendar;
