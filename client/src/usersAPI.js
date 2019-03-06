class usersAPI {
	static init() {
		process.env.REACT_APP_STAGE === "dev"
			? (this.base_URL = "http://localhost:3001")
			: (this.base_URL = "https://www.freelancerbooking.app");
	}

	static login(user) {
		return fetch(this.baseURL + "/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user)
		}).then(resp => resp.json());
	}

	static bookings() {
		return fetch(this.base_URL + "/bookings").then(res => res.json());
	}

	static register(user) {
		return fetch(this.base_URL + "/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user)
		}).then(resp => resp.json());
	}

	static validate() {
		return this.get(this.base_URL + "/validate");
	}

	static get(url) {
		const token = localStorage.getItem("token");
		return fetch(url, {
			headers: { Authorization: token }
		}).then(resp => resp.json());
	}
}

usersAPI.init();

export default usersAPI;
