import express from 'express'
const router = express.Router();
import * as filmController from '../controllers/film.controller.js'
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
/**
 * @swagger
 * /films/{id}:
 *   get:
 *     summary: Lấy phim theo ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phim
 *     responses:
 *       200:
 *         description: Thông tin phim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/Film'
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: ""
 *       404:
 *         description: Không tìm thấy phim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Không tìm thấy người dùng"
 *                 status:
 *                   type: integer
 *                   example: -1
 */
router.get('/:id', filmController.getFilmById);
/**
 * @swagger
 * /films:
 *   post:
 *     summary: Thêm phim mới
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmInput'
 *           example:
 *             title: "Inception"
 *             description: "A mind-bending thriller"
 *             release_year: 2010
 *             language_id: 1
 *             original_language_id: 1
 *             rental_duration: 5
 *             rental_rate: 4.99
 *             length: 148
 *             replacement_cost: 20.00
 *             rating: "PG-13"
 *             special_features: ["Trailers", "Commentaries"]
 *     responses:
 *       201:
 *         description: Phim được thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Film added"
 *                 filmId:
 *                   type: integer
 *                   example: 123
 *                 status:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Lỗi xác thực dữ liệu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add film"
 *                 message:
 *                   type: object
 *                   example: { "title": ["Title is required"] }
 *                 status:
 *                   type: integer
 *                   example: -1
 */
router.post('/', filmController.addFilm);
/**
 * @swagger
 * /films/{id}:
 *   delete:
 *     summary: Xóa phim theo ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phim
 *     responses:
 *       200:
 *         description: Kết quả xóa phim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Film deleted"
 *                 status:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Không tìm thấy phim để xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Film not found"
 *                 status:
 *                   type: integer
 *                   example: -1
 */
router.delete('/:id', filmController.deleteFilm);
/**
 * @swagger
 * /films/{id}:
 *   put:
 *     summary: Cập nhật phim theo ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phim
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmInput'
 *           example:
 *             title: "Inception Updated"
 *             description: "An updated description"
 *             release_year: 2010
 *             language_id: 1
 *             original_language_id: 1
 *             rental_duration: 5
 *             rental_rate: 4.99
 *             length: 148
 *             replacement_cost: 20.00
 *             rating: "PG-13"
 *             special_features: ["Trailers", "Commentaries"]
 *     responses:
 *       200:
 *         description: Phim được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Film updated"
 *                 status:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Lỗi xác thực dữ liệu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update film"
 *                 message:
 *                   type: object
 *                   example: { "title": ["Title is required"] }
 *                 status:
 *                   type: integer
 *                   example: -1
 *       404:
 *         description: Không tìm thấy phim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Film not found"
 *                 status:
 *                   type: integer
 *                   example: -1
 */
router.put('/:id', filmController.updateFilm);

export default router