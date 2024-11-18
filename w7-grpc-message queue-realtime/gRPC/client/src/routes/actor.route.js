import express from 'express'
import * as actorController from '../controllers/actor.controller.js'

const router = express.Router()

router.get('/', actorController.getAllActors);
router.get('/:id', actorController.getActorById);
router.post('/', actorController.addActor);
router.delete('/:id', actorController.deleteActor);
router.put('/:id', actorController.updateActor);

export default router