const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actor.controller');

router.get('/', actorController.getAllActors);
router.get('/:id', actorController.getActorById);
router.post('/', actorController.addActor);
router.delete('/:id', actorController.deleteActor);
router.put('/:id', actorController.updateActor);

module.exports = router;
