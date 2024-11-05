const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film.controller');
/**
 * @swagger
 * /films:
 *   get:
 *     summary: Lấy tất cả phim
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: Danh sách phim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Film'
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: ""
 */
router.get('/', filmController.getAllFilms);

module.exports = router;