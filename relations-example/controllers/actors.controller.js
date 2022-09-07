// Models
const { Actor } = require('../models/actor.model');

const getAllActors = async (req, res, next) => {
	try {
		const actors = await Actor.findAll();

		res.status(200).json({
			status: 'success',
			data: { actors },
		});
	} catch (error) {
		console.log(error);
	}
};

const getActorById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const actor = await Actor.findOne({ where: { id } });

		res.status(200).json({
			status: 'success',
			data: { actor },
		});
	} catch (error) {
		console.log(error);
	}
};

const createActor = async (req, res, next) => {
	try {
		const { name, country, age } = req.body;

		const newActor = await Actor.create({
			name,
			country,
			age,
		});

		res.status(201).json({
			status: 'success',
			data: { newActor },
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllActors,
	getActorById,
	createActor,
};
