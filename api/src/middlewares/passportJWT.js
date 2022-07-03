const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { UserModel: User } = require('../models/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await User.findOne({ id: jwt_payload.sub }, '-password');

    if (!user) return done(null, false);

    return done(null, user);
  })
);
