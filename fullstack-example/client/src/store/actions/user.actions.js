import axios from 'axios';

import { usersActions } from '../slices/user.slice';
import { errorActions } from '../slices/error.slice';

const API_URL = '';

export const login = (email, password) => {
	return async dispatch => {
		try {
			// API REQUEST
			const res = await axios.post(``, {});

			dispatch(
				usersActions.login({
					user: {}, // Get user from response
				})
			);
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const signup = userData => {
	return async dispatch => {
		try {
			// API REQUEST
			await axios.post(``, {});
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const logout = () => {
	return async dispatch => {
		try {
			dispatch(usersActions.logout());
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const checkToken = () => {
	return async dispatch => {
		try {
			const res = await axios.get(``, {});

			dispatch(usersActions.refreshUser({ user: {} }));
		} catch (error) {
			dispatch(logout());
		}
	};
};
