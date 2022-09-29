import axios from 'axios';

import { postsActions } from '../slices/posts.slice';
import { errorActions } from '../slices/error.slice';

const API_URL = '';

export const getPosts = () => {
	return async dispatch => {
		try {
			// API REQUEST

			const res = await axios.get(API_URL, {});

			// Get response data

			dispatch(
				postsActions.getPosts({
					posts: [], // Replace with real data!
				})
			);
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const submitPost = (title, content) => {
	return async dispatch => {
		try {
			// API REQUEST

			const res = await axios.post(API_URL, {}, {});

			const { newPost, name } = res.data.data;

			const newPostData = { ...newPost, user: { name }, comments: [] };

			dispatch(postsActions.newPost({ newPost: newPostData }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const updatePost = (id, title, content) => {
	return async dispatch => {
		try {
			// API REQUEST
			dispatch(postsActions.updatePost({ id, title, content }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const deletePost = id => {
	return async dispatch => {
		try {
			// API REQUEST
			dispatch(postsActions.deletePost({ id }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const getMyPosts = () => {
	return async dispatch => {
		try {
			// Create endpoint to only get the session user's posts
			const res = await axios.get(`${API_URL}/me`, {});

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const getProfilePosts = userId => {
	return async dispatch => {
		try {
			// Create endpoint to get a user's posts given an id by params
			const res = await axios.get(`${API_URL}/profile/${userId}`, {});

			const { posts } = res.data;

			dispatch(postsActions.getPosts({ posts }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};
