import React from "react";

import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import usersAPI from "../usersAPI";

const styles = {
	root: {
		background: "white"
	},
	input: {
		color: "black"
	}
};

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
		const { classes } = this.props;
		return (
			<div>
				<TextField
					id="usernameInput"
					label="Username"
					value={username}
					onChange={handleChange}
					margin="normal"
					name="username"
					className={classes.root}
					InputProps={{
						className: classes.input
					}}
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
					className={classes.root}
					InputProps={{
						className: classes.input
					}}
				/>
				<br />
				<Button onClick={handleSubmit} variant="contained" color="primary">
					SUBMIT
				</Button>
			</div>
		);
	}
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
