import React, { Component } from "react";

// Client ID and API key from the Developer Console
const CLIENT_ID =
	"1005600538488-7g41gt2g6i8uad3ckl397aag0gm67b6v.apps.googleusercontent.com";
const API_KEY = "AIzaSyADcWwyeoYH7pQruwOQBhkWbuBRuUM3Z_4";

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
	"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

const event = {
	summary: "Working on app",
	location: "800 Howard St., San Francisco, CA 94103",
	description: "A chance to hear more about Google's developer products.",
	start: {
		dateTime: "2019-02-28T09:00:00-07:00",
		timeZone: "Europe/London"
	},
	end: {
		dateTime: "2019-02-28T17:00:00-07:00",
		timeZone: "Europe/London"
	},
	recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
	attendees: [{ email: "joaquim@barreto.co" }],
	reminders: {
		useDefault: false,
		overrides: [
			{ method: "email", minutes: 24 * 60 },
			{ method: "popup", minutes: 10 }
		]
	}
};

export default class NewCalenderEvent extends Component {
	// Initializes the API client library and sets up sign-in state listeners.
	initClient = () => {
		window.gapi.client
			.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES
			})
			.then(() => {
				this.newEvent();
			});
	};

	newEvent = () => {
		window.gapi.client.calendar.events.insert({
			calendarId: "primary",
			resource: event
		});
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
				<p>New Calendar Event</p>

				<pre id="content" style={{ whiteSpace: "pre-wrap" }} />

				<form className="note-editor" onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="title"
						placeholder="Title"
						onChange={this.handleChange}
					/>
					<textarea
						name="body"
						placeholder="Enter description ..."
						onChange={this.handleChange}
					/>
					<div className="button-row">
						<input className="button" type="submit" value="Save" />
					</div>
				</form>
			</div>
		);
	}
}
