import React, { Component } from "react";

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

class DeleteCalendarEvent extends Component {
	state = {
		open: true
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleClick = () => {
		this.setState({ open: false });
		this.props.deleteEvent(this.props.selectedEvent);
	};

	render() {
		const { selectedEvent, user, classes } = this.props;
		return (
			<div>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h6" id="modal-title">
							Booking cancellation details
						</Typography>
						<Typography variant="subtitle1" id="simple-modal-description">
							Client Company: {user.company}
						</Typography>
						<Typography variant="subtitle2" id="simple-modal-description">
							Date of booking: {selectedEvent.start}
						</Typography>
						<Button
							onClick={this.handleClick}
							variant="contained"
							color="primary"
							className={classes.button}
						>
							Cancel Booking
						</Button>
					</div>
				</Modal>
			</div>
		);
	}
}

DeleteCalendarEvent.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteCalendarEvent);
