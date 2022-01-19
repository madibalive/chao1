import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { body } from 'express-validator';
import { UniqueConstraintError } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';
import { routeWrapper } from '../utils/routeWrapper';
import { appEnv } from '../utils/env';

type GetUsersResponseType = {
  name: string
}[];
export const getUsers = [
  routeWrapper<GetUsersResponseType>(async () => {
    const users = await UserModel.findAll();
    return {
      status: httpStatus.OK,
      body: users.map((u) => ({ name: u.name }))
    };
  })
];

function generateToken(id: number) {
  return jwt.sign({ id }, appEnv.jwtSecret, { expiresIn: appEnv.jwtExpirationSeconds });
}
export const postLogin = [
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err: Error, user: UserModel, info: IVerifyOptions) => {
      if (err) { return next(err); }
      if (!user) {
        return next(boom.unauthorized(info.message));
      }
      const token = generateToken(user.id);
      return res.json({ token });
    })(req, res, next);
  }
];

type GetMeResponseType = {
  name: string,
  email: string
};
export const getMe = [
  routeWrapper<GetMeResponseType>((req: Request) => {
    const user: UserModel = req.user!;
    return {
      status: httpStatus.OK,
      body: {
        name: user.name,
        email: user.email
      }
    };
  })
];

type PostSignUpResponseType = {
  token: string,
  email: string
};
export const postSignUp = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  routeWrapper<PostSignUpResponseType>(async (req: Request) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await UserModel.create({ name: email, email, hashedPassword });
      return {
        status: httpStatus.OK,
        body: {
          token: generateToken(user.id),
          email
        }
      };
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw boom.conflict(`Email ${email} already exists`);
      }
      throw err;
    }
  })
];
