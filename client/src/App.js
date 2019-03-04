import React, { Component } from "react";
import "./App.css";

import MainCalendar from "./containers/MainCalendar";
import usersAPI from "./usersAPI";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/HomePage";

import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
	state = {
		username: "",
		user: ""
	};

	login = (username, token) => {
		this.setState({ username });
		localStorage.setItem("token", token);
	};

	signout = () => {
		this.setState({ username: "" });
		localStorage.removeItem("token");
		this.props.history.push("/");
	};

	componentDidMount() {
		usersAPI.validate().then(data => {
			if (data.error) {
				this.props.history.push("/");
			} else {
				this.login(data.user.username, data.token);
				this.userDetails(data.user);
				this.props.history.push("/calendar");
			}
		});
	}

	userDetails = user => {
		this.setState({ user });
	};

	render() {
		const { login, signout, userDetails } = this;
		const { username, user } = this.state;
		return (
			<div className="App">
				<NavBar username={username} user={user} signout={signout} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route
						path="/register"
						component={routerProps => <RegisterForm {...routerProps} />}
					/>
					<Route
						path="/login"
						component={routerProps => (
							<LoginForm
								{...routerProps}
								login={login}
								userDetails={userDetails}
							/>
						)}
					/>
					<Route
						path="/calendar"
						component={routerProps => (
							<MainCalendar {...routerProps} username={username} user={user} />
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
