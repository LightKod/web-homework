const db = require('../database');
const axios = require('axios');
const crypto = require('crypto');
// Define status constants
const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;
function generateHashedToken() {
    const currentTime = new Date().toISOString(); // Lấy thời gian hiện tại
    const dataToHash = currentTime + process.env.SECRET_KEY; // Chuỗi để băm
    const hashedToken = crypto.createHash('sha256').update(dataToHash).digest('hex'); // Tạo băm

    return { token: hashedToken, time: currentTime };
}
// Get all films
exports.getAllFilms = async (req, res) => {
    try {
        const { token, time } = generateHashedToken();

        // Gửi yêu cầu GET tới server B
        const response = await axios.get('http://localhost:3002/films', {params:{time:time},
            headers: {
                // Thêm các header cần thiết nếu có (ví dụ: Authorization)
                'Authorization': `Bearer ${token}` // Hoặc x-api-key tùy vào cách bạn cấu hình server B
            }
        });

        // Trả về kết quả từ server B cho client
        const results = response.data;
        const status = results.length > 0 ? STATUS_SUCCESS : STATUS_ERROR;
        res.json({ results, status, message: "" });
    } catch (err) {
        console.error('Error fetching films from server B:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve films from server B', status: STATUS_ERROR });
    }
};

// Get an film by ID
