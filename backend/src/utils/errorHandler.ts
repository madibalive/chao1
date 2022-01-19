import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import { logger } from './logger';

export const customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  let boomErr;
  if (boom.isBoom(err) && !err.isServer) {
    // it's not a server error
    boomErr = err;
    logger.info('Boom error', boomErr);
  } else {
    // it's a server error
    boomErr = boom.boomify(err);
    logger.error('Server error', boomErr);
    boomErr.output.payload.message = ''; // message can contains private information
  }
  return res.status(boomErr.output.statusCode).send(boomErr.output);
};
