import React, { Component } from "react";
import "./App.css";

import MainCalendar from "./containers/MainCalendar";

class App extends Component {
	render() {
		return (
			<div className="App">
				<MainCalendar />
			</div>
		);
	}
}

export default App;
