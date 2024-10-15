import createError from 'http-errors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import db from './src/database.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/swagger.js'; 

import actorRoutes from './src/routes/actor.route.js'
import filmRoutes from './src/routes/film.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/actor', actorRoutes);
app.use('/films', filmRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  console.log(`Swagger UI tại http://localhost:${PORT}/api-docs`);
});
export default app