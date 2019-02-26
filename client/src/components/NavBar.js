import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

function NavBar(props) {
	const { classes, username, signout } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						Freelancer Booking App
					</Typography>
					{username ? `Welcome back, ${username}!` : null}
					{username ? (
						<Button onClick={signout} color="inherit" href="/">
							Logout
						</Button>
					) : (
						<div>
							<Button color="inherit" href="/signup">
								Sign Up
							</Button>
							<Button color="inherit" href="/signin">
								Login
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
