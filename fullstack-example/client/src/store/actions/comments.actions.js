import axios from 'axios';

import { postsActions } from '../slices/posts.slice';
import { errorActions } from '../slices/error.slice';

const API_URL = '';

export const submitComment = (postId, comment) => {
	return async dispatch => {
		try {
			const res = await axios.post(API_URL, {}, {});

			// Get response
			dispatch(
				postsActions.newComment({
					postId,
					newComment: {
						id: '', // Get comment's id from response
						comment,
					},
				})
			);
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const deleteComment = (postId, commentId) => {
	return async dispatch => {
		try {
			await axios.delete(`${API_URL}`, {});

			dispatch(postsActions.deleteComment({ postId, commentId }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};
