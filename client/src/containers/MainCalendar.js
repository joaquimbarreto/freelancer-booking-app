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
		const eventsDay = this.state.events.map(event => event.start.slice(0, 10));
		const selectedSlotDay = moment(event.start)
			.format()
			.slice(0, 10);
		if (eventsDay.includes(selectedSlotDay)) {
			alert("Freelancer busy on this day. Please select different day.");
		} else {
			return this.setState({
				selectedSlot: event,
				selectedEvent: null
			});
		}
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
		if (event.title === "Busy") {
			alert(`Cannot edit this event`);
		} else {
			return this.setState({
				selectedEvent: event,
				selectedSlot: null
			});
		}
	};

	handleDeleteEvent = event => {
		this.setState({
			events: this.state.events.filter(events => events.start !== event.start),
			selectedEvent: null
		});
	};

	render() {
		const { user } = this.props;
		const { selectedSlot, selectedEvent, events } = this.state;
		return (
			<div className="App">
				<p>
					<strong>Click On a Day to Book</strong>
				</p>
				<p>Or select a {user && user.company} booking to cancel</p>
				<GoogleCalendarEvents
					handleEvents={this.handleEvents}
					selectedSlot={selectedSlot}
					newEvent={this.handleNewEvent}
					selectedEvent={selectedEvent}
					user={user}
					deleteEvent={this.handleDeleteEvent}
				/>
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="month"
					views={["month", "agenda"]}
					events={events}
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
