import React, { Component } from "react";
import NewCalendarEvent from "./NewCalendarEvent";
import DeleteCalendarEvent from "./DeleteCalendarEvent";

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

	// Initializes the API client library and sets up sign-in state listeners.
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
					// Listen for sign-in state changes.
					window.gapi.auth2
						.getAuthInstance()
						.isSignedIn.listen(this.updateSigninStatus);

					// Handle the initial sign-in state.
					this.updateSigninStatus(
						window.gapi.auth2.getAuthInstance().isSignedIn.get()
					);
				},
				error => {
					this.appendPre(JSON.stringify(error, null, 2));
				}
			);
	};

	// Called when the signed in status changes, to update the UI
	// appropriately. After a sign-in, the API is called.

	updateSigninStatus = isSignedIn => {
		const authorizeButton = document.getElementById("authorize_button");
		const signoutButton = document.getElementById("signout_button");

		if (isSignedIn) {
			console.log("logged in");
			authorizeButton.style.display = "none";
			signoutButton.style.display = "block";
			this.listUpcomingEvents();
		} else {
			console.log("not logged in");
			authorizeButton.style.display = "block";
			signoutButton.style.display = "none";
		}
	};

	// Sign in the user upon button click.

	handleAuthClick = event => {
		window.gapi.auth2.getAuthInstance().signIn();
	};

	// Sign out the user upon button click.

	handleSignoutClick = event => {
		window.gapi.auth2.getAuthInstance().signOut();
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

	// Print the summary and start datetime/date of the next ten events in
	// the authorized user's calendar. If no events are found an
	// appropriate message is printed.

	listUpcomingEvents = () => {
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
				<p>Google Calendar API</p>

				{/* Add buttons to initiate auth sequence and sign out  */}
				<button
					id="authorize_button"
					style={{ display: "none" }}
					onClick={this.handleAuthClick}
				>
					Authorize
				</button>
				<button
					id="signout_button"
					style={{ display: "none" }}
					onClick={this.handleSignoutClick}
				>
					Sign Out
				</button>

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
