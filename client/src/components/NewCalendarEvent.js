import React, { Component } from "react";

export default class NewCalenderEvent extends Component {
	handleSubmit = event => {
		event.preventDefault();
		console.log(event);
		this.props.newEvent(event);
	};

	render() {
		return (
			<div>
				<p>Booking details:</p>
				<form className="note-editor" onSubmit={this.handleSubmit}>
					<label>
						Date:
						<input type="text" defaultValue={this.props.selectedSlot.start} />
					</label>
					<label>
						Working for:
						<input
							type="text"
							name="title"
							defaultValue={this.props.username}
						/>
					</label>
					<div className="button-row">
						<input className="button" type="submit" value="Confirm Booking" />
					</div>
				</form>
			</div>
		);
	}
}
