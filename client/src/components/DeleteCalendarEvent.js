import React, { Component } from "react";

export default class NewCalenderEvent extends Component {
	state = {
		event: []
	};

	handleChange = event => {
		console.log(event);
	};

	handleSubmit = event => {
		event.preventDefault();
		console.log(event);
	};

	render() {
		return (
			<div>
				<p>Booking cancellation details:</p>
				<form className="note-editor" onSubmit={this.handleSubmit}>
					<label>
						Date:
						<input type="text" defaultValue={this.props.selectedEvent.start} />
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
						<input
							className="button"
							type="submit"
							value="Confirm Cancellation"
						/>
					</div>
				</form>
			</div>
		);
	}
}
