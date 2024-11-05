const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const db = require('../database'); // Kết nối với cơ sở dữ liệu của bạn

// Cấu hình JWT strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header Authorization
    secretOrKey: process.env.ACCESS_TOKEN_SECRET, // Khóa bí mật của bạn
};

// Tạo chiến lược
passport.use(new Strategy(opts, async (jwtPayload, done) => {
    try {
        // Tìm người dùng trong cơ sở dữ liệu từ jwtPayload
        const user = await db('users').where({ id: jwtPayload.id }).first();
        if (user) {
            return done(null, user); // Người dùng hợp lệ
        } else {
            return done(null, false); // Không tìm thấy người dùng
        }
    } catch (err) {
        return done(err, false); // Có lỗi trong quá trình tìm kiếm
    }
}));


