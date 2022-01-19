import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import passportJwt from 'passport-jwt';
import { UserModel } from '../models/user';
import { appEnv } from '../utils/env';

declare global {
  namespace Express {
    interface User extends UserModel { }
  }
}

// ===== Password functions =====
function comparePassword(
  candidatePassword: string, bcryptedPassword: string, cb: (err: Error, isMatch: boolean) => void
): void {
  bcrypt.compare(candidatePassword, bcryptedPassword, (err: Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
}

// ===== Local Strategy =====
passport.use(
  'local',
  new passportLocal.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      UserModel.findOne({ where: { email: email.toLowerCase() } })
        .then((user) => {
          if (user === null) {
            return done(undefined, false, { message: `Email ${email} not found` });
          }
          comparePassword(password, user.hashedPassword, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
              return done(undefined, user);
            }
            return done(undefined, false, { message: 'Invalid email or password' });
          });
          return undefined;
        })
        .catch(done);
    }
  )
);

// ===== JWT Strategy =====
passport.use(
  'jwt',
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appEnv.jwtSecret
    },
    (jwtPayload, done) => {
      UserModel.findOne({ where: { id: jwtPayload.id } })
        .then((u) => {
          if (u === null) {
            return done(undefined, false, { message: `User ${jwtPayload.id} not found` });
          }
          return done(undefined, u);
        })
        .catch(done);
    }
  )
);
export const jwtAuthentMiddleware = passport.authenticate('jwt', { session: false });
