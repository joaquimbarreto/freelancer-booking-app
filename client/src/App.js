import React, { Component } from "react";
import "./App.css";

import MainCalendar from "./containers/MainCalendar";

import usersAPI from "./usersAPI";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import User from "./components/User";

import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";

import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
	state = {
		user: null
	};

	login = (user, token) => {
		this.setState({ user });
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
				this.login(data.user, data.token);
				this.props.history.push("/calendar");
			}
		});
	}

	render() {
		const { login, signout } = this;
		const { user } = this.state;
		return (
			<div className="App">
				<NavBar user={user} signout={signout} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route
						path="/register"
						component={routerProps => <RegisterForm {...routerProps} />}
					/>
					<Route
						path="/login"
						component={routerProps => (
							<LoginForm {...routerProps} login={login} />
						)}
					/>
					<Route
						path="/calendar"
						component={routerProps => (
							<MainCalendar {...routerProps} user={user} />
						)}
					/>
					<Route
						path="/user"
						component={routerProps => <User {...routerProps} user={user} />}
					/>

					<Route component={NotFound} />
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
