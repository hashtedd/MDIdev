import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";

export class Navbar extends Component {
	state = {
		isOpen: false,
	};

	toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
	render() {
		const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
		return (
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						ABC COMPANY
					</a>
					<div
						className="dropdown dropstyle"
						onClick={this.toggleOpen}
					>
						<button
							className="btn btn-secondary dropdown-toggle"
							type="button"
							id="dropdownMenuButton"
							data-toggle="dropdown"
							aria-haspopup="true"
						>
							{this.props.profile.first_name}{" "}
							{this.props.profile.last_name}
						</button>
						<div
							className={menuClass}
							aria-labelledby="dropdownMenuButton"
						>
							<a class="dropdown-item" href="/edit">
								Edit Profile
							</a>
							<a class="dropdown-item" href="/login">
								Logout
							</a>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.user.profile,
	};
};

export default connect(mapStateToProps)(Navbar);
