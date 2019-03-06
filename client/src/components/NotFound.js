import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class NotFound extends Component {
	render() {
		return (
			<div>
				<h1>404: Not found</h1>
				<Link to={"/"} style={{ textDecoration: "none" }}>
					<Button variant="contained" color="inherit">
						Back Home
					</Button>
				</Link>
			</div>
		);
	}
}

export default NotFound;
