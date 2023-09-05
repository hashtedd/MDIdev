import React, { Component } from "react";
import { connect } from "react-redux";

export class Navbar extends Component {
	render() {
		return (
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						ABC COMPANY
					</a>
					<div class="dropdown">
						<button
							class="btn btn-secondary dropdown-toggle"
							type="button"
							id="dropdownMenuButton"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							{this.props.profile.first_name}{" "}
							{this.props.profile.last_name}
						</button>
						<div
							class="dropdown-menu"
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
