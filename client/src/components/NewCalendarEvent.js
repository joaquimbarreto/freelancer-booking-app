import React, { Component } from "react";

export default class NewCalendarEvent extends Component {
	handleClick = () => {
		this.props.newEvent(this.props.user, this.props.selectedSlot.start);
	};

	render() {
		const { selectedSlot, user } = this.props;
		return (
			<div>
				<p>Booking details:</p>
				<p>Date of booking: {selectedSlot.start.toString()}</p>
				<div>Client Company: {user.company}</div>
				<button onClick={this.handleClick}>Confirm Booking</button>
			</div>
		);
	}
}
