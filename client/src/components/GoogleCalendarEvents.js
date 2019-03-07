import React, { Component } from "react";
import NewCalendarEvent from "./NewCalendarEvent";
import DeleteCalendarEvent from "./DeleteCalendarEvent";
import moment from "moment";
import googleAPI from "../googleAPI";

export default class GoogleCalendarEvents extends Component {
	newEvent = (user, day) => {
		const eventStart = moment(day)
			.add(9, "hours")
			.format();
		const eventEnd = moment(day)
			.add(17, "hours")
			.format();
		const booking = {
			summary: "Client: " + user.company,
			start: {
				dateTime: eventStart
			},
			end: {
				dateTime: eventEnd
			}
		};
		googleAPI.createBooking(booking);
		this.props.newEvent(booking);
	};

	deleteEvent = event => {
		googleAPI.deleteBooking({
			event_id: event.id
		});
		this.props.deleteEvent(event);
	};

	render() {
		const { selectedSlot, selectedEvent, user } = this.props;
		return (
			<div>
				{selectedSlot ? (
					<NewCalendarEvent
						selectedSlot={selectedSlot}
						newEvent={this.newEvent}
						user={user}
					/>
				) : null}
				{selectedEvent ? (
					<DeleteCalendarEvent
						selectedEvent={selectedEvent}
						deleteEvent={this.deleteEvent}
						user={user}
					/>
				) : null}
			</div>
		);
	}
}
