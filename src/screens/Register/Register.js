import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions/profile";
import { formatMobileNumber, isValidEmail, setStore } from "../../utils";
import "./style.css";

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				email: "",
				first_name: "",
				last_name: "",
				password: "",
				dob: "",
				mobile_number: "",
				gender: "Male",
			},
			errors: {
				user: {
					email: "Email is not valid!",
					password: "Enter Password",
					first_name: "Enter First Name",
					last_name: "Enter Last Name",
					dob: "Enter Date of Birth",
					mobile_number: "Mobile Number is not valid!",
				},
			},
			validForm: false,
			submitted: false,
		};
	}

	validationErrorMessage = (event) => {
		const { name, value } = event.target;
		let errors = this.state.errors;
		switch (name) {
			case "first_name":
				errors.user.first_name =
					value.length < 1 ? "Enter First Name!" : "";
				break;
			case "last_name":
				errors.user.last_name =
					value.length < 1 ? "Enter Last Name!" : "";
				break;
			case "email":
				errors.user.email = isValidEmail(value)
					? ""
					: "Email is not valid!";
				break;
			case "password":
				errors.user.password =
					value.length < 1 ? "Enter Password!" : "";
				break;
			case "mobile_number":
				errors.user.mobile_number =
					value.length < 10 && value.length > 10
						? "Enter valid Mobile number!"
						: "";
				break;
			case "dob":
				errors.user.dob =
					value.length < 1 ? "Enter Date of Birth!" : "";
				break;
			default:
				break;
		}
		console.log(errors);

		this.setState({ errors });
	};

	inputChange = (event) => {
		let mobile_number = "";
		const { name, value } = event.target;
		const user = this.state.user;
		if (name === "mobile_number") {
			mobile_number = formatMobileNumber(value);
			user[name] = mobile_number;
		} else {
			user[name] = value;
		}
		this.setState({ user });
		this.validationErrorMessage(event);
	};

	setGender(event) {
		const { name, value } = event.target;
		const user = this.state.user;
		user[name] = value;
	}

	validateForm = (errors) => {
		let valid = true;
		Object.entries(errors.user).forEach((item) => {
			console.log(item);
			item && item[1].length > 0 && (valid = false);
		});
		return valid;
	};

	submitForm = async (event) => {
		this.setState({ submitted: true });
		this.props.dispatch(ActionCreators.Confirmation(true));
		const user = this.state.user;
		if (user && this.props.profile) {
			user.profileImage = this.props.profile.profileImage;
		}
		event.preventDefault();
		if (this.validateForm(this.state.errors) && this.props.profile) {
			console.info("Valid Form");
			setStore("user", user);
			this.props.dispatch(ActionCreators.registerProfile(user));
			this.props.history.push("/confirm");
		} else {
			console.log("Invalid Form");
		}
	};

	render() {
		const {
			first_name,
			last_name,
			email,
			password,
			mobile_number,
			dob,
			gender,
		} = this.state.user;
		const { submitted } = this.state;
		const current = new Date().toISOString().split("T")[0];

		return (
			<div className="registerPanel">
				<div className="row">
					<div className="col-sm-6 mb-2">
						<label className="col-sm-4 col-form-label">
							First Name
						</label>
						<input
							type="text"
							value={first_name}
							name="first_name"
							onChange={(e) => {
								this.inputChange(e);
							}}
							className="form-control"
							placeholder="First Name"
						/>
						{submitted &&
							this.state.errors.user.first_name.length > 0 && (
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
							value={last_name}
							name="last_name"
							onChange={(e) => {
								this.inputChange(e);
							}}
							className="form-control"
							placeholder="Last Name"
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
							value={email}
							name="email"
							onChange={(e) => {
								this.inputChange(e);
							}}
							className="form-control"
							id="email"
							placeholder="hasa@anymail.com"
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
							htmlFor="password"
							className="col-sm-4 col-form-label"
						>
							Password:
						</label>
						<input
							type="password"
							value={password}
							name="password"
							onChange={(e) => {
								this.inputChange(e);
							}}
							className="form-control"
							id="password"
							placeholder="********"
						/>
						{submitted &&
							this.state.errors.user.password.length > 0 && (
								<span className="error">
									{this.state.errors.password}
								</span>
							)}
					</div>
					<div className="col-sm-6 mb-2"></div>
				</div>
				<div className="row">
					<div className="col-sm-6 mb-2">
						<label
							htmlFor="mobile_number"
							className="col-sm-4 col-form-label"
						>
							Mobile Number
						</label>
						<input
							type="text"
							pattern="[0-9]"
							maxLength="14"
							value={mobile_number}
							name="mobile_number"
							onChange={(e) => {
								this.inputChange(e);
							}}
							className="form-control"
							id="mobile_number"
							placeholder="(070)123-4567"
						/>
						{submitted &&
							this.state.errors.user.mobile_number.length > 0 && (
								<span className="error">
									{this.state.errors.user.mobile_number}
								</span>
							)}
					</div>
					<div className="col-sm-6 mb-2">
						<label
							htmlFor="dob"
							className="col-sm-4 col-form-label"
						>
							Date of Birth
						</label>
						<input
							type="date"
							value={dob}
							name="dob"
							max={current}
							onChange={(e) => {
								this.inputChange(e);
							}}
							className="form-control"
							id="dob"
							placeholder="Enter BirthDate"
						/>
						{submitted && this.state.errors.user.dob.length > 0 && (
							<span className="error">
								{this.state.errors.user.dob}
							</span>
						)}
					</div>
					<div
						className="col-sm-4 mb-2"
						onChange={this.setGender.bind(this)}
					>
						<label
							htmlFor="gender"
							className="col-sm-4 col-form-label"
						>
							Gender
						</label>
						<br />
						<input
							type="radio"
							value="Male"
							name="gender"
							defaultChecked
						/>
						Male
						<br />
						<input type="radio" value="Female" name="gender" />
						Female
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 centeritem">
						<button
							type="button"
							className="button"
							onClick={this.submitForm}
						>
							CREATE ACCOUNT
						</button>
					</div>
					<div className="col-sm-4"></div>
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

export default connect(mapStateToProps)(withRouter(Register));
