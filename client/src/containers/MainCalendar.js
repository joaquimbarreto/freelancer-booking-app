import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import GoogleCalendarEvents from "../components/GoogleCalendarEvents";
import googleAPI from "../googleAPI";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class MainCalendar extends Component {
	state = {
		events: [],
		selectedSlot: null,
		selectedEvent: null
	};

	componentDidMount = () => {
		const { user } = this.props;
		user &&
			googleAPI
				.bookings()
				.then(data => {
					return data.items.map(event => {
						return {
							start: event.start.dateTime,
							end: event.end.dateTime,
							title: event.summary.includes(`Client: ${user.company}`)
								? event.summary
								: "Busy",
							id: event.id
						};
					});
				})
				.then(data => this.setState({ events: data }));
	};

	handleSelectSlot = event => {
		return this.setState({
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
		return this.setState({
			selectedEvent: event,
			selectedSlot: null
		});
		// const { user } = this.props;
		// if (this.state.events.title.includes(`Client: ${user.company}`)) {
		// 	return this.setState({
		// 		selectedEvent: event,
		// 		selectedSlot: null
		// 	});
		// } else {
		// 	alert(`Cannot edit this event`);
		// }
	};

	handleDeleteEvent = event => {
		this.setState({
			events: this.state.events.filter(events => events.start !== event.start),
			selectedEvent: null
		});
	};

	render() {
		const { user } = this.props;

		return (
			<div className="App">
				<p>
					<strong>Click On a Day to Book</strong>
				</p>
				<p>Or select event to cancel</p>
				<GoogleCalendarEvents
					handleEvents={this.handleEvents}
					selectedSlot={this.state.selectedSlot}
					newEvent={this.handleNewEvent}
					selectedEvent={this.state.selectedEvent}
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
