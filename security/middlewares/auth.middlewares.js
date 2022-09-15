const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

dotenv.config({ path: './config.env' });

const catchAsync = fn => {
	return (req, res, next) => {
		fn(req, res, next).catch(err => next(err));
	};
};

const protectSession = catchAsync(async (req, res, next) => {
	// Get token
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Extract token
		// req.headers.authorization = 'Bearer token'
		token = req.headers.authorization.split(' ')[1]; // -> [Bearer, token]
	}

	// Check if the token was sent or not
	if (!token) {
		return res.status(403).json({
			status: 'error',
			message: 'Invalid session',
		});
	}

	// Verify the token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	// Verify the token's owner
	const user = await User.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		return res.status(403).json({
			status: 'error',
			message: 'The owner of the session is no longer active',
		});
	}

	// Grant access
	req.sessionUser = user;
	next();
});

// Check the sessionUser to compare to the one that wants to be updated/deleted
const protectUsersAccount = (req, res, next) => {
	const { sessionUser, user } = req;
	// const { id } = req.params;

	// If the users (ids) don't match, send an error, otherwise continue
	if (sessionUser.id !== user.id) {
		return res.status(403).json({
			status: 'error',
			message: 'You are not the owner of this account.',
		});
	}

	// If the ids match, grant access
	next();
};

// Create middleware to protect posts, only owners should be able to update/delete
const protectPostsOwners = (req, res, next) => {
	const { sessionUser, post } = req;

	if (sessionUser.id !== post.userId) {
		return res.status(403).json({
			status: 'error',
			message: 'This post does not belong to you.',
		});
	}

	next();
};

// Create middleware to protect comments, only owners should be able to update/delete
const protectCommentsOwners = (req, res, next) => {
	const { sessionUser, comment } = req;

	if (sessionUser.id !== comment.userId) {
		return res.status(403).json({
			status: 'error',
			message: 'This comment does not belong to you.',
		});
	}

	next();
};

// Create middleware that only grants access to admin users
const protectAdmin = (req, res, next) => {
	const { sessionUser } = req;

	if (sessionUser.role !== 'admin') {
		return res.status(403).json({
			status: 'error',
			message: 'You do not have the access level for this data.',
		});
	}

	next();
};

module.exports = {
	protectSession,
	protectUsersAccount,
	protectPostsOwners,
	protectCommentsOwners,
	protectAdmin,
};
