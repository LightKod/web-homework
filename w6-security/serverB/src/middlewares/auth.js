const crypto = require('crypto');
const AuthMiddleware = (req, res, next) => {
    const { time } = req.query;

    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header
    const dataToHash = time + process.env.SECRET_KEY; // Chuỗi để băm
    const hashedToken = crypto.createHash('sha256').update(dataToHash).digest('hex'); // Tạo băm

    if (token === hashedToken) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = AuthMiddleware