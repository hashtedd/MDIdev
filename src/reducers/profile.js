import { Types } from "../constants/actionTypes";

const initialState = {
	profile: {
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		dob: "",
		mobile_number: "",
		gender: "",
	},
	formSubmitted: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.LOGIN:
			console.log("login", action.payload.user);
			return {
				...state,
				profile: action.payload.user,
				formSubmitted: false, // after update user formsubmition reset
			};
		case Types.LOGOUT:
			return {
				...state,
				profile: action.payload.user,
				formSubmitted: false, // after update user formsubmition reset
			};
		case Types.REGISTER:
			console.log("Register", action.payload.user);
			return {
				...state,
				profile: action.payload.user,
				formSubmitted: false, // after update user formsubmition reset
			};
		case Types.SHOW_USER:
			console.log("show", action.payload.user);
			return {
				...state,
				profile: action.payload.user,
				formSubmitted: false, // after update user formsubmition reset
			};
		case Types.UPDATE_USER:
			return {
				...state,
				profile: action.payload.user,
				formSubmitted: false, // after update user formsubmition reset
			};
		case Types.UPDATE_PROFILE_PICTURE:
			return {
				...state,
				profile: {
					...state.profile,
					profileImage: action.payload.image,
				},
			};
		case Types.CONFIRMATION:
			return {
				...state,
				formSubmitted: action.payload.status,
			};
		default:
			return state;
	}
};

export default reducer;
