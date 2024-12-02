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
        const user = await db('users').where({ id: jwtPayload.id }).first();
        if (user) {
            return done(null, user); 
        } else {
            return done(null, false); 
        }
    } catch (err) {
        return done(err, false); 
    }
}));


