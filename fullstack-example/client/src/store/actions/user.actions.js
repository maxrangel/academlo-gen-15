import axios from 'axios';

import { usersActions } from '../slices/user.slice';
import { errorActions } from '../slices/error.slice';

const API_URL = `${process.env.REACT_APP_HOST}/users`;

export const login = (email, password) => {
	return async dispatch => {
		try {
			// API REQUEST
			const res = await axios.post(`${API_URL}/login`, { email, password });

			const { user, token } = res.data.data;

			localStorage.setItem('token', token);

			dispatch(usersActions.login({ user }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const signup = userData => {
	return async dispatch => {
		try {
			// API REQUEST
			await axios.post(`${API_URL}`, userData);
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const logout = () => {
	return async dispatch => {
		try {
			localStorage.removeItem('token');
			dispatch(usersActions.logout());
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const checkToken = () => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.get(`${API_URL}/check-token`, {
				headers: { authorization: `Bearer ${token}` },
			});

			const { user } = res.data.data;

			dispatch(usersActions.refreshUser({ user }));
		} catch (error) {
			localStorage.removeItem('token');
			dispatch(logout());
		}
	};
};
