import express from 'express'
const router = express.Router();
import * as filmController from '../controllers/film.controller.js'

router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);
router.post('/', filmController.addFilm);
router.delete('/:id', filmController.deleteFilm);
router.put('/:id', filmController.updateFilm);

export default router