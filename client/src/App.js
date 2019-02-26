import React, { Component } from "react";
import "./App.css";

import MainCalendar from "./containers/MainCalendar";
import usersAPI from "./usersAPI";

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
				this.props.history.push("/inventory");
			}
		});
	}
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={MainCalendar} />
					<Route
						path="/signin"
						component={routerProps => (
							<SignInForm {...routerProps} signin={signin} />
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
