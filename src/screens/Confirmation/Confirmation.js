import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions/profile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./style.css";

export class Confirmation extends Component {
	loginBack = () => {
		this.props.dispatch(ActionCreators.Confirmation(true));
		this.props.history.push("/login");
	};
	render() {
		return (
			<div className="row">
				<div className="confirmcontainer">
					<CheckCircleOutlineIcon
						size="large"
						style={{
							color: "green",
							width: "50px",
							height: "50px",
						}}
					/>
					<h3>Congratulations</h3>
					<h4>Your account has been created successfully</h4>
					<div className="loginbtnContainer">
						<button
							type="button"
							className="button"
							onClick={this.loginBack}
						>
							Go to Login
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.user.profile,
	};
};

export default connect(mapStateToProps)(Confirmation);
