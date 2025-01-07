import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey:"process.env.JWT_SECRET"
}, async (jwtPayload, done) => {
    try {
        return done(null, jwtPayload);
    } catch (error) {
        return done(error);
    }
}))
}

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["metroToken"];
    }
    return token;
}

export default initializePassport;