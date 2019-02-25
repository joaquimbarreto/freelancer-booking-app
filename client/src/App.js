import React, { Component } from "react";
import "./App.css";

import MainCalendar from "./containers/MainCalendar";

import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
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
