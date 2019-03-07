import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "../App.css";

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
					<Typography
						align="left"
						variant="h6"
						color="inherit"
						className={classes.grow}
					>
						Freelancer Booking App
					</Typography>
					{user ? (
						<Grid
							container
							justify="flex-end"
							className={classes.root}
							spacing={16}
							item
							xs={6}
						>
							<Grid
								container
								className={classes.demo}
								justify="flex-end"
								spacing={16}
							>
								<Grid key={0} item>
									<Typography
										align="justify"
										justify-content="baseline"
										variant="subtitle1"
										color="inherit"
										className={classes.grow}
									>
										{user ? (
											<Link
												style={{
													textDecoration: "none"
												}}
												className="link"
												to={"/user"}
											>
												Welcome back, {user.name}!
											</Link>
										) : null}
									</Typography>
								</Grid>
								<Grid key={1} item>
									<Button
										onClick={signout}
										variant="contained"
										color="secondary"
										href="/"
									>
										Sign out
									</Button>
								</Grid>
							</Grid>
						</Grid>
					) : (
						<div>
							<Grid container className={classes.root} spacing={16}>
								<Grid item xs={12}>
									<Grid
										container
										className={classes.demo}
										justify="center"
										spacing={16}
									>
										<Grid key={0} item>
											<Link to={"/register"} style={{ textDecoration: "none" }}>
												<Button variant="contained" mr={2} color="primary">
													Register
												</Button>
											</Link>
										</Grid>
										<Grid key={1} item>
											<Link to={"/login"} style={{ textDecoration: "none" }}>
												<Button variant="contained" color="inherit">
													Login
												</Button>
											</Link>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
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
