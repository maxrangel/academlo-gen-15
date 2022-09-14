// Models
const { User } = require('../models/user.model');

const userExists = async (req, res, next) => {
	try {
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
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	userExists,
};
