import React, { Component } from "react";

import googleAPI from "../googleAPI";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const styles = theme => ({
	paper: {
		position: "absolute",
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: "none"
	},
	button: {
		margin: theme.spacing.unit
	},
	input: {
		display: "none"
	}
});

class User extends Component {
	state = {
		open: true,
		events: [],
		loading: true
	};

	componentDidMount = () => {
		const { user } = this.props;
		user &&
			googleAPI
				.bookings()
				.then(data => {
					return data.items.map(event => {
						return {
							start: event.start.dateTime,
							end: event.end.dateTime,
							title: event.summary,
							id: event.id
						};
					});
				})
				.then(data => this.setState({ events: data, loading: false }));
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleClick = () => {
		this.setState({ open: false });
		this.props.history.push("/calendar");
	};

	render() {
		const { classes } = this.props;
		const userEvents = this.state.events.filter(
			event => event.title === `Client: ${this.props.user.company}`
		);
		return (
			<div>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<div style={getModalStyle()} className={classes.paper}>
						{this.state.loading ? (
							<Typography variant="h6" id="modal-title">
								Loading
							</Typography>
						) : (
							<>
								<Typography variant="h6" id="modal-title">
									Your bookings
								</Typography>
								<Typography variant="subtitle1" id="modal-title">
									There are {userEvents.length} bookings for{" "}
									{this.props.user.company}
								</Typography>
								{userEvents.map(event => {
									return (
										<Typography
											variant="subtitle1"
											key={event.id}
											id="simple-modal-description"
										>
											- {event.start.slice(0, 10)}
										</Typography>
									);
								})}
								<Button
									onClick={this.handleClick}
									variant="contained"
									color="primary"
									className={classes.button}
								>
									Close
								</Button>
							</>
						)}
					</div>
				</Modal>
			</div>
		);
	}
}

User.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(User);
