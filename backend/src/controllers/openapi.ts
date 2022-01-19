import { Request, Response } from 'express';

const openapiFileOptions = {
  root: '.'
};

export const getOpenapiYaml = (_: Request, res: Response) => {
  res.sendFile('openapi.yaml', openapiFileOptions);
};

export const getOpenapiUI = (_: Request, res: Response) => {
  res.sendFile('assets/redoc.html', openapiFileOptions);
};
