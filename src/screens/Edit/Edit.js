import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions/profile";
import Navbar from "../../components/Navbar";
import "./style.css";

export class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				email: this.props.profile.email,
				first_name: this.props.profile.first_name,
				last_name: this.props.profile.last_name,
				dob: this.props.profile.dob,
				mobile_number: this.props.profile.mobile_number,
			},
			validForm: false,
			submitted: false,
		};
	}

	inputChange = (event) => {
		const { name, value } = event.target;
		const user = this.props.profile;
		user[name] = value;
		this.setState({ user });
	};

	submitForm = async (event) => {
		this.setState({ submitted: true });
		this.props.dispatch(ActionCreators.Confirmation(true));
		const user = this.state.user;
		if (user && this.props.profile) {
			user.profileImage = this.props.profile.profileImage;
		}
		event.preventDefault();
		if (this.props.profile) {
			console.info("Valid Form");
			this.props.dispatch(ActionCreators.updateProfile(user));
			this.props.history.push("/home");
		} else {
			console.log("Invalid Form");
		}
	};

	render() {
		const { submitted } = this.state;
		const current = new Date().toISOString().split("T")[0];

		return (
			<div>
				<Navbar />
				<div className="registerPanel">
					<div className="row">
						<div className="col-sm-6 mb-2">
							<label className="col-sm-4 col-form-label">
								First Name
							</label>
							<input
								type="text"
								value={this.props.profile.first_name}
								name="first_name"
								onChange={(e) => {
									this.inputChange(e);
								}}
								className="form-control"
							/>
							{submitted &&
								this.state.errors.user.first_name.length >
									0 && (
									<span className="error">
										{this.state.errors.user.first_name}
									</span>
								)}
						</div>
						<div className="col-sm-6 mb-2">
							<label className="col-sm-4 col-form-label">
								Last Name
							</label>
							<input
								type="text"
								value={this.props.profile.last_name}
								name="last_name"
								onChange={(e) => {
									this.inputChange(e);
								}}
								className="form-control"
							/>
							{submitted &&
								this.state.errors.user.last_name.length > 0 && (
									<span className="error">
										{this.state.errors.user.last_name}
									</span>
								)}
						</div>
					</div>
					<div className="row">
						<div className="col-sm-8 mb-2">
							<label
								htmlFor="email"
								className="col-sm-8 col-form-label"
							>
								Email
							</label>
							<input
								type="email"
								value={this.props.profile.email}
								name="email"
								onChange={(e) => {
									this.inputChange(e);
								}}
								className="form-control"
								id="email"
							/>
							{submitted &&
								this.state.errors.user.email.length > 0 && (
									<span className="error">
										{this.state.errors.user.email}
									</span>
								)}
						</div>
						<div className="col-sm-4"></div>
					</div>
					<div className="row">
						<div className="col-sm-6 mb-2">
							<label
								htmlFor="mobile_number"
								className="col-sm-6 col-form-label"
							>
								Mobile Number
							</label>
							<input
								type="text"
								pattern="[0-9]"
								maxLength="14"
								value={this.props.profile.mobile_number}
								name="mobile_number"
								onChange={(e) => {
									this.inputChange(e);
								}}
								className="form-control"
								id="mobile_number"
							/>
							{submitted &&
								this.state.errors.user.mobile_number.length >
									0 && (
									<span className="error">
										{this.state.errors.user.mobile_number}
									</span>
								)}
						</div>
						<div className="col-sm-6 mb-2">
							<label
								htmlFor="dob"
								className="col-sm-6 col-form-label"
							>
								Date of Birth
							</label>
							<input
								type="date"
								value={this.props.profile.dob}
								name="dob"
								max={current}
								onChange={(e) => {
									this.inputChange(e);
								}}
								className="form-control"
								id="dob"
							/>
							{submitted &&
								this.state.errors.user.dob.length > 0 && (
									<span className="error">
										{this.state.errors.user.dob}
									</span>
								)}
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 centerblock">
							<button
								type="button"
								className="button"
								onClick={this.submitForm}
							>
								UPDATE ACCOUNT
							</button>
						</div>
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

export default connect(mapStateToProps)(withRouter(Edit));
