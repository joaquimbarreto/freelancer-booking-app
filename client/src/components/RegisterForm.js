import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import usersAPI from "../usersAPI";

export default class RegisterForm extends Component {
	state = {
		name: "",
		username: "",
		password: "",
		password_confirmation: "",
		company: "",
		email: "",
		telephone: ""
	};

	handleSubmit = () => {
		usersAPI.register(this.state).then(data => {
			if (data.error) {
				alert(data.error);
			} else {
				this.props.history.push("/login");
			}
		});
	};

	handleChange = event =>
		this.setState({ [event.target.name]: event.target.value });

	render() {
		const {
			name,
			username,
			company,
			email,
			telephone,
			password,
			password_confirmation
		} = this.state;
		const { handleChange, handleSubmit } = this;

		return (
			<div>
				<TextField
					id="nameInput"
					label="Name"
					value={name}
					onChange={handleChange}
					margin="normal"
					name="name"
				/>
				<br />
				<TextField
					id="usernameInput"
					label="Username"
					value={username}
					onChange={handleChange}
					margin="normal"
					name="username"
				/>
				<br />
				<TextField
					id="companyInput"
					label="Company"
					value={company}
					onChange={handleChange}
					margin="normal"
					name="company"
				/>
				<br />
				<TextField
					id="emailInput"
					label="Email"
					value={email}
					onChange={handleChange}
					margin="normal"
					name="email"
				/>
				<br />
				<TextField
					id="telephoneInput"
					label="Telephone"
					value={telephone}
					onChange={handleChange}
					margin="normal"
					name="telephone"
				/>
				<br />
				<TextField
					id="passwordInput"
					label="Password"
					value={password}
					onChange={handleChange}
					margin="normal"
					name="password"
					type="password"
				/>
				<br />
				<TextField
					id="passwordConfirmationInput"
					label="Password_confirmation"
					value={password_confirmation}
					onChange={handleChange}
					margin="normal"
					name="password_confirmation"
					type="password"
				/>
				<br />
				<Button onClick={handleSubmit} variant="contained" color="primary">
					SUBMIT
				</Button>
			</div>
		);
	}
}
