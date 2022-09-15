// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({
		attributes: { exclude: ['password'] },
		where: { id },
	});

	// If user doesn't exist, send error message
	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	// req.anyPropName = 'anyValue'
	req.user = user;
	next();
});

module.exports = {
	userExists,
};
