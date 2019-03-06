import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import usersAPI from "../usersAPI";

class LoginForm extends React.Component {
	state = {
		username: "",
		password: ""
	};

	handleSubmit = () => {
		usersAPI.login(this.state).then(data => {
			if (data.error) {
				alert(data.error);
			} else {
				this.props.login(data.user, data.token);
				this.props.history.push("/calendar");
			}
		});
	};

	handleChange = event =>
		this.setState({ [event.target.name]: event.target.value });

	render() {
		const { username, password } = this.state;
		const { handleChange, handleSubmit } = this;

		return (
			<div>
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
					id="passwordInput"
					label="Password"
					value={password}
					onChange={handleChange}
					margin="normal"
					name="password"
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

export default LoginForm;
