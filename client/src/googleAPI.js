class googleAPI {
	static init() {
		this.baseURL = "http://localhost:3001";
	}
	static bookings() {
		return fetch("http://localhost:3001/bookings").then(res => res.json());
	}

	static deleteBooking(booking) {
		return fetch("http://localhost:3001/delete_booking", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ booking })
		}).then(resp => resp.json());
	}

	static createBooking(booking) {
		return fetch("http://localhost:3001/create_booking", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ booking })
		}).then(resp => resp.json());
	}
}

googleAPI.init();

export default googleAPI;
