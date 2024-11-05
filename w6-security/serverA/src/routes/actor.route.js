const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actor.controller');
const e = require('express');
/**
 * @swagger
 * /actor:
 *   get:
 *     summary: Get all actors
 *     tags: [Actor]
 *     responses:
 *       200:
 *         description: Successfully Operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items: 
 *                     $ref: '#/components/schemas/Actor'
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       404:
 *         description: Endpoint Not Found
 */
router.get('/', actorController.getAllActors);


/**
 * @swagger
 * /actor/{id}:
 *   get:
 *     summary: Get actor by ID
 *     tags: [Actor]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *        description: Actor's id to return
 *     responses:
 *       200:
 *         description: Successfully Operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: object
 *                   $ref: '#/components/schemas/Actor'
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       404:
 *         description: Endpoint Not Found
 *      
 */
router.get('/:id', actorController.getActorById);


/**
 * @swagger
 * /actor:
 *   post:
 *     summary: Get actor by ID
 *     tags: [Actor]
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Actor'
 *        description: Actor's id to return
 *        required: true
 *     responses:
 *       201:
 *         description: Successfully Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actorId:
 *                   type: integer
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                   example: Actor added
 *       404:
 *         description: Endpoint Not Found
 *       400:
 *         description: Invalid Input
 *      
 */
router.post('/', actorController.addActor);


/**
 * @swagger
 * /actor/{id}:
 *   delete:
 *     summary: Delete actor by ID
 *     tags: [Actor]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *        description: Actor's id to delete
 *     responses:
 *       200:
 *         description: Successfully Operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                   example: Actor deleted
 *       404:
 *         description: Endpoint Not Found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error: 
 *                    type: string
 *                    example: Failed to delete actor
 *                  status:
 *                    type: integer
 *                    example: -1
 *      
 */
router.delete('/:id', actorController.deleteActor);


/**
 * @swagger
 * /actor/{id}:
 *   put:
 *     summary: Update actor by ID
 *     tags: [Actor]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *        description: Actor's id to update
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Actor'
 *        description: Actor's id to return
 *        required: true
 *     responses:
 *       200:
 *         description: Successfully Operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                   example: Actor updated
 *       404:
 *         description: Endpoint Not Found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error: 
 *                    type: string
 *                    example: Failed to update actor
 *                  status:
 *                    type: integer
 *                    example: -1
 *      
 */
router.put('/:id', actorController.updateActor);


module.exports = router;