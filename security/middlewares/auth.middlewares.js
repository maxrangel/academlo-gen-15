const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

dotenv.config({ path: './config.env' });

const protectSession = async (req, res, next) => {
	try {
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
		next();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	protectSession,
};
