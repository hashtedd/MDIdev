import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions/profile";
import { getStore } from "../../utils";
import { Button } from "react-bootstrap";
import "./style.css";

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {
				email: "Enter Email!",
				password: "Enter Password!",
			},
			loginStatus: "",
			submitted: false,
		};
	}

	inputChange = (event) => {
		console.log(event.target);
		const { name, value } = event.target;
		this.setState({ [name]: value });
		this.validationErrorMessage(event);
	};

	validationErrorMessage = (event) => {
		const { name, value } = event.target;
		let errors = this.state.errors;
		switch (name) {
			case "email":
				errors.email = value.length < 1 ? "Enter Email" : "";
				break;
			case "password":
				errors.password = value.length < 1 ? "Enter Password" : "";
				break;
			default:
				break;
		}
		this.setState({ errors });
	};

	validateForm = (errors) => {
		let valid = true;
		console.log(errors);
		Object.entries(errors).forEach((item) => {
			console.log(item);
			item && item[1].length > 0 && (valid = false);
		});
		console.log(valid);
		return valid;
	};

	loginForm = async (event) => {
		this.setState({ submitted: true });
		event.preventDefault();
		if (this.validateForm(this.state.errors)) {
			console.info("Valid Form");
			const user = getStore("user");
			console.log(this.state.email);
			if (
				user.email === this.state.email &&
				user.password === this.state.password
			) {
				this.props.dispatch(ActionCreators.login(user));
				this.props.history.push("/home");
			} else {
				this.setState({
					loginStatus: "Login Failed! Invalid Email and Password",
				});
			}
		} else {
			console.log("Invalid Form");
		}
	};

	render() {
		const { email, password, errors, submitted, loginStatus } = this.state;
		return (
			<div className="loginForm">
				<div class="headtext">WELCOME BACK</div>
				<form>
					<div>
						<div className="col-sm-12 datablock">
							<label
								htmlFor="email"
								className="col-sm-6 col-form-label"
							>
								Email:
							</label>
							<div className="col-sm-6 mb-2">
								<input
									type="text"
									value={email}
									autoComplete="on"
									name="email"
									onChange={(e) => {
										this.inputChange(e);
									}}
									className="form-control"
									id="email"
									placeholder="hasa@anymail.com"
								/>
								{submitted && errors.email.length > 0 && (
									<span className="error">
										{errors.email}
									</span>
								)}
							</div>
						</div>
					</div>
					<div>
						<div className="col-sm-12 datablock">
							<label
								htmlFor="password"
								className="col-sm-6 col-form-label"
							>
								Password:
							</label>
							<div className="col-sm-6 mb-2">
								<input
									type="password"
									value={password}
									autoComplete="on"
									name="password"
									onChange={(e) => {
										this.inputChange(e);
									}}
									className="form-control"
									id="password"
									placeholder="********"
								/>
								{submitted && errors.password.length > 0 && (
									<span className="error">
										{errors.password}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 center mt-1">
							{submitted && loginStatus.length > 0 && (
								<span className="error">{loginStatus}</span>
							)}
						</div>
					</div>
					<div className="row">
						<div className=" center">
							<Button
								variant="outline-success"
								style={{ fontWeight: "bold" }}
								onClick={this.loginForm}
							>
								LOGIN
							</Button>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-4 mt-2"></div>
						<div className="col-sm-4 right">
							Still Have No Account?
							<Link to="/register">SIGNUP</Link> Now
						</div>
						<div className="col-sm-4 mt-2"></div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.user.profile,
	};
};

export default connect(mapStateToProps)(withRouter(Login));
