class usersAPI {
	static init() {
		this.baseURL = "http://localhost:3000";
		this.signinURL = this.baseURL + "/signin";
	}

	static signin(user) {
		return fetch(this.signinURL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user)
		}).then(resp => resp.json());
	}

	static validate() {
		return this.get("http://localhost:3000/validate");
	}

	static get(url) {
		const token = localStorage.getItem("token");
		return fetch(url, {
			headers: { Authorization: token }
		}).then(resp => resp.json());
	}

	static createUser(user) {
		return fetch("http://localhost:3000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user)
		}).then(resp => resp.json());
	}
}

API.init();

export default usersAPI;
