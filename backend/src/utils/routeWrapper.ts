import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import { validationResult } from 'express-validator';
import boom from '@hapi/boom';

type RouteResponse<T> = { status: number, body: T };
type RouteFunction<T> = (req: Request) => Promise<RouteResponse<T>> | RouteResponse<T>;

function validateRequest(req: Request) {
  const errors = validationResult(req).formatWith((e) => `${e.location}[${e.param}]: ${e.msg}`);
  if (!errors.isEmpty()) {
    const boomErr = boom.badRequest('', errors);
    boomErr.output.payload.message = errors.array().join(' | ');
    return boomErr;
  }
  return undefined;
}

export function routeWrapper<T>(rf: RouteFunction<T>): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const err = validateRequest(req);
    if (err) { return next(err); }
    try {
      const response = await rf(req);
      return res.status(response.status).json(response.body);
    } catch (e) {
      return next(e);
    }
  };
}
