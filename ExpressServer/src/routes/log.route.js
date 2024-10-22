import express from 'express'
const router = express.Router();
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.get('/search-log', (req, res) => {
    const query = req.query.q || ''; // Lấy chuỗi truy vấn từ request, mặc định là chuỗi rỗng
    const logDir = path.join(__dirname, '../../logs'); // Thư mục lưu log
  
    if (!query) {
      return res.status(400).send('Please provide a search query');
    }
  
    // Đọc các file log từ thư mục log
    fs.readdir(logDir, (err, files) => {
      if (err) {
        return res.status(500).send('Error reading log directory');
      }
  
      // Chỉ lấy các file log
      const logFiles = files.filter(file => file.endsWith('.log'));
  
      let results = [];
  
      // Đọc từng file log và tìm kiếm chuỗi truy vấn
      logFiles.forEach(file => {
        const filePath = path.join(logDir, file);
        const logData = fs.readFileSync(filePath, 'utf8');
  
        // Tìm tất cả các dòng log chứa chuỗi truy vấn
        const matches = logData.split('\n').filter(line => line.includes(query));
        results = results.concat(matches);
      });
  
      if (results.length === 0) {
        return res.status(404).send(`No log entries found containing "${query}"`);
      }
  
      // Trả về kết quả tìm kiếm
      res.json({
        message: `Found ${results.length} log entries containing "${query}"`,
        results
      });
    });
  });

  export default router