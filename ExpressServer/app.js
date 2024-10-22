import createError from 'http-errors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import db from './src/database.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/swagger.js'; 
import winston from 'winston';
import { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import actorRoutes from './src/routes/actor.route.js'
import filmRoutes from './src/routes/film.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Định nghĩa định dạng cho log
const logger = winston.createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // new winston.transports.Console(),
     // Lưu log vào file, với cơ chế xoay vòng file log hàng ngày
     new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD', // Xoay vòng hàng ngày
      zippedArchive: true, // Nén file cũ
      maxSize: '20m', // Giới hạn file tối đa 20MB
      maxFiles: '14d' // Lưu giữ log trong vòng 14 ngày
    }),
  ]
});
var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
// Middleware ghi log request
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);

  // Khi response được gửi xong, ghi log response
  res.on('finish', () => {
    logger.info(`Response: ${res.statusCode} ${res.statusMessage}`);
  });

  next();
});
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