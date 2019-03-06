class googleAPI {
	static init() {
		process.env.REACT_APP_STAGE === "dev"
			? (this.base_URL = "http://localhost:3001")
			: (this.base_URL = "https://www.freelancerbooking.app");
	}
	static bookings() {
		return fetch(this.base_URL + "/bookings").then(res => res.json());
	}

	static deleteBooking(booking) {
		return fetch(this.base_URL + "/delete_booking", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ booking })
		});
	}

	static createBooking(booking) {
		return fetch(this.base_URL + "/create_booking", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ booking })
		});
	}
}

googleAPI.init();

export default googleAPI;
