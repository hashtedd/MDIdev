import { Types } from "../constants/actionTypes";

export const ActionCreators = {
	registerProfile: (user) => ({ type: Types.REGISTER, payload: { user } }),

	showProfile: (user) => ({ type: Types.SHOW_USER, payload: { user } }),

	updateProfileImage: (image) => ({
		type: Types.UPDATE_PROFILE_PICTURE,
		payload: { image },
	}),

	updateProfile: (user) => ({ type: Types.UPDATE_USER, payload: { user } }),

	Confirmation: (status) => ({
		type: Types.CONFIRMATION,
		payload: { status },
	}),

	login: (user) => ({ type: Types.LOGIN, payload: { user } }),

	logout: (user) => ({ type: Types.LOGOUT, payload: { user } }),
};
