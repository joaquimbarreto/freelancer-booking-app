import React, { Component } from "react";

export default class NewCalendarEvent extends Component {
	handleClick = () => {
		this.props.newEvent(this.props.username, this.props.selectedSlot.start);
	};

	render() {
		const { username, selectedSlot } = this.props;
		return (
			<div>
				<p>Booking details:</p>
				<p>Date of booking: {selectedSlot.start.toString()}</p>
				<div>Client: {username}</div>
				<button onClick={this.handleClick}>Confirm Booking</button>
			</div>
		);
	}
}
