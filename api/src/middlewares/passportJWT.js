const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { UserModel: User } = require('../models/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
  passReqToCallback: true,
};

passport.use(
  new JwtStrategy(options, async (request, jwt_payload, done) => {
    const user = await User.findOne({ _id: jwt_payload.sub }, '-password');

    if (!user) return done(null, false);

    const authHeader = request.headers.authorization;
    const [, token] = authHeader.split(' ');

    return done(null, { profile: user, token });
  })
);
