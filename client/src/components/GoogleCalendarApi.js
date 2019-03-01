import React, { Component } from "react";
import NewCalendarEvent from "./NewCalendarEvent";
import DeleteCalendarEvent from "./DeleteCalendarEvent";
import moment from "moment";

// Client ID and API key from the Developer Console
const CLIENT_ID =
	"1018435152495-61obv43e4u41htc05vv8klcfofeou8vf.apps.googleusercontent.com";
const API_KEY = "AIzaSyBE0p5Yq0V1P76m81D6JjMYCKypYlvVMnA";

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
	"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

export default class GoogleCalendarApi extends Component {
	// On load, called to load the auth2 library and API client library.
	handleClientLoad = () => {
		window.gapi.load("client:auth2", this.initClient);
	};

	componentDidMount = () => {
		this.handleClientLoad();
		setTimeout(() => {
			this.handleAuthClick();
		}, 1500);
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
					// Listen for sign-in state changes.
					window.gapi.auth2
						.getAuthInstance()
						.isSignedIn.listen(this.updateSigninStatus);

					// Handle the initial sign-in state.
					this.updateSigninStatus(
						window.gapi.auth2.getAuthInstance().isSignedIn.get()
					);
					// authorizeButton.onclick = this.handleAuthClick;
					// signoutButton.onclick = this.handleSignoutClick;
				},
				error => {
					this.appendPre(JSON.stringify(error, null, 2));
				}
			);
	};

	// Called when the signed in status changes, to update the UI
	// appropriately. After a sign-in, the API is called.

	updateSigninStatus = isSignedIn => {
		if (isSignedIn) {
			this.listEvents();
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

	listEvents = () => {
		window.gapi.client.calendar.events
			.list({
				calendarId: "primary",
				timeMin: "2019-02-01T00:00:00Z",
				showDeleted: false,
				singleEvents: true,
				orderBy: "startTime"
			})
			.then(response => {
				const events = response.result.items;
				this.props.handleEvents(events);
			});
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

	newEvent = (username, day) => {
		const eventStart = moment(day)
			.add(9, "hours")
			.format();
		const eventEnd = moment(day)
			.add(17, "hours")
			.format();
		const booking = {
			summary: " Working for " + username,
			start: {
				dateTime: eventStart,
				timeZone: "Europe/London"
			},
			end: {
				dateTime: eventEnd,
				timeZone: "Europe/London"
			}
		};
		const insertBooking = window.gapi.client.calendar.events.insert({
			calendarId: "primary",
			resource: booking
		});
		insertBooking.execute();
		this.listEvents();
	};

	deleteEvent = event => {
		const deleteBooking = window.gapi.client.calendar.events.delete({
			calendarId: "primary",
			eventId: event.id
		});
		deleteBooking.execute();
		this.listEvents();
	};

	render() {
		const { selectedSlot, selectedEvent, username } = this.props;
		return (
			<div>
				<pre id="content" style={{ whiteSpace: "pre-wrap" }} />
				{selectedSlot ? (
					<NewCalendarEvent
						selectedSlot={selectedSlot}
						newEvent={this.newEvent}
						username={username}
					/>
				) : null}
				{selectedEvent ? (
					<DeleteCalendarEvent
						selectedEvent={selectedEvent}
						deleteEvent={this.deleteEvent}
						username={username}
					/>
				) : null}
			</div>
		);
	}
}
