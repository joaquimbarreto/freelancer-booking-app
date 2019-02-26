import React, { Component } from "react";
import "./App.css";

import MainCalendar from "./containers/MainCalendar";
import usersAPI from "./usersAPI";
import NavBar from "./components/NavBar";
import SignInForm from "./components/SignInForm";
import HomePage from "./components/HomePage";

import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
	state = {
		username: ""
	};

	signin = (username, token) => {
		this.setState({ username });
		localStorage.setItem("token", token);
	};

	signout = () => {
		this.setState({ username: "" });
		localStorage.removeItem("token");
	};

	componentDidMount() {
		usersAPI.validate().then(data => {
			if (data.error) {
				this.props.history.push("/signin");
			} else {
				this.signin(data.username, data.token);
				this.props.history.push("/calendar");
			}
		});
	}
	render() {
		const { signin, signout } = this;
		const { username } = this.state;
		return (
			<div className="App">
				<NavBar username={username} signout={signout} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route
						path="/signin"
						component={routerProps => (
							<SignInForm {...routerProps} signin={signin} />
						)}
					/>
					<Route
						path="/calendar"
						component={routerProps => (
							<MainCalendar {...routerProps} username={username} />
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
