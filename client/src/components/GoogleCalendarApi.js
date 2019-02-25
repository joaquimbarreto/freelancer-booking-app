import React, { Component } from "react";
import NewCalendarEvent from "./NewCalendarEvent";
import DeleteCalendarEvent from "./DeleteCalendarEvent";

// Client ID and API key from the Developer Console
const CLIENT_ID = "103314057531969022412";
const API_KEY = "AIzaSyADcWwyeoYH7pQruwOQBhkWbuBRuUM3Z_4";

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
	"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

export default class GoogleCalendarApi extends Component {
	state = {
		newEvent: []
	};

	// On load, called to load the auth2 library and API client library.
	handleClientLoad = () => {
		window.gapi.load("client:auth2", this.initClient);
	};

	componentDidMount = () => {
		this.handleClientLoad();
	};

	// Initializes the API client library.
	initClient = () => {
		window.gapi.client
			.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES
			})
			.then(
				() => {
					window.gapi.client.calendar.events
						.list({
							calendarId: "primary",
							timeMin: "2018-10-25T00:00:00Z",
							showDeleted: false,
							singleEvents: true,
							orderBy: "startTime"
						})
						.then(response => {
							const events = response.result.items;
							this.props.handleEvents(events);
						});
				},
				error => {
					this.appendPre(JSON.stringify(error, null, 2));
				}
			);
	};

	/**
	 * Append a pre element to the body containing the given message
	 * as its text node. Used to display the results of the API call.
	 *
	 * @param {string} message Text to be placed in pre element.
	 */
	appendPre = message => {
		var pre = document.getElementById("content");
		var textContent = document.createTextNode(message + "\n");
		pre.appendChild(textContent);
	};

	newEvent = () => {
		window.gapi.client.calendar.events.insert({
			calendarId: "primary",
			resource: this.state.newEvent
		});
		this.listUpcomingEvents();
	};

	deleteEvent = () => {
		window.gapi.client.calendar.events.delete({
			calendarId: "primary",
			eventId: ""
		});
		this.listUpcomingEvents();
	};

	render() {
		return (
			<div>
				<pre id="content" style={{ whiteSpace: "pre-wrap" }} />

				<NewCalendarEvent
					selectedSlot={this.props.selectedSlot}
					newEvent={this.props.newEvent}
				/>
				<DeleteCalendarEvent
					selectedEvent={this.props.selectedEvent}
					deleteEvent={this.props.deleteEvent}
				/>
			</div>
		);
	}
}
