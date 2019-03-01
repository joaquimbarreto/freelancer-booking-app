import React, { Component } from "react";

export default class NewCalenderEvent extends Component {
	handleClick = () => {
		this.props.deleteEvent(this.props.selectedEvent);
	};

	render() {
		return (
			<div>
				<p>Booking cancellation details:</p>
				<div>Date of booking: {this.props.selectedEvent.start}</div>
				<div>Client :{this.props.username}</div>
				<button onClick={this.handleClick}>Cancel Booking</button>
			</div>
		);
	}
}
