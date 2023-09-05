import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import ProfileImage from "../../components/ProfileImage";
import "./style.css";

export class Home extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className="homePanel1">
					<div className="row">
						<div className="col-sm-6 mb-2">
							<ProfileImage />
						</div>
						<div className="col-sm-6 mb-2">
							<h3 className="boldtext">Welcome</h3>
							<h3 className="lighttext">
								{this.props.profile.first_name}{" "}
								{this.props.profile.last_name}
							</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6 mb-2 boldtext">
							Email Address:
						</div>
						<div className="col-sm-6 mb-2 lighttext">
							<h4>{this.props.profile.email}</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6 mb-2 boldtext">Name:</div>
						<div className="col-sm-6 mb-2 lighttext">
							<h4>
								{this.props.profile.first_name}{" "}
								{this.props.profile.last_name}
							</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6 mb-2 boldtext">Gender:</div>
						<div className="col-sm-6 mb-2 lighttext">
							<h4>{this.props.profile.gender}</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6 mb-2 boldtext">
							Date of Birth:
						</div>
						<div className="col-sm-6 mb-2 lighttext">
							<h4>{this.props.profile.dob}</h4>
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

export default connect(mapStateToProps)(Home);
