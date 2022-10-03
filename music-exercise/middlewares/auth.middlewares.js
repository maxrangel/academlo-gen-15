const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

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
		return next(new AppError('The token was invalid', 403));
	}

	// Verify the token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	// Verify the token's owner
	const user = await User.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		return next(
			new AppError('The owner of the session is no longer active', 403)
		);
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
		return next(new AppError('You are not the owner of this account.', 403));
	}

	// If the ids match, grant access
	next();
};

// Create middleware that only grants access to admin users
const protectAdmin = (req, res, next) => {
	const { sessionUser } = req;

	if (sessionUser.role !== 'admin') {
		return next(new AppError('You do not have the right access level.', 403));
	}

	next();
};

module.exports = {
	protectSession,
	protectUsersAccount,
	protectAdmin,
};
