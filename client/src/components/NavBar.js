import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
	const { classes, user, signout } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						Freelancer Booking App
					</Typography>
					{user ? `Welcome back, ${user.name}!` : null}
					{user ? (
						<Button onClick={signout} color="inherit" href="/">
							Sign out
						</Button>
					) : (
						<div>
							<Link to={"/register"} style={{ textDecoration: "none" }}>
								<Button variant="contained" color="inherit">
									Register
								</Button>
							</Link>

							<Link to={"/login"} style={{ textDecoration: "none" }}>
								<Button variant="contained" color="inherit">
									Login
								</Button>
							</Link>
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
