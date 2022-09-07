const express = require('express');

// Controllers
const {
	getAllActors,
	getActorById,
	createActor,
	assignActorToMovie,
} = require('../controllers/actors.controller');

const actorsRouter = express.Router();

actorsRouter.get('/', getAllActors);

actorsRouter.post('/', createActor);

actorsRouter.post('/movies', assignActorToMovie);

actorsRouter.get('/:id', getActorById);

module.exports = { actorsRouter };
