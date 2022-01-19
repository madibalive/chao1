import chai, { expect } from 'chai';
import { appEnv, EnvType } from '../../src/utils/env';

const assertArrays = require('chai-arrays');

chai.use(assertArrays);


before(async () => {
  const testEnvType: EnvType = 'test';
  expect(appEnv.envType).equals(testEnvType, 'Tests execution must be in TEST environment type');
});
