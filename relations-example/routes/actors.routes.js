const express = require('express');

// Controllers
const {
	getAllActors,
	getActorById,
	createActor,
} = require('../controllers/actors.controller');

const actorsRouter = express.Router();

actorsRouter.get('/', getAllActors);

actorsRouter.post('/', createActor);

actorsRouter.get('/:id', getActorById);

module.exports = { actorsRouter };
