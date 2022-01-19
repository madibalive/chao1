import { Sequelize } from "sequelize";
import { appEnv } from "../utils/env";
import { logger } from "../utils/logger";
export const sequelize = new Sequelize("sqlite:memory", {});

// export const sequelize = new Sequelize({
//   dialect: 'postgres',
//   database: appEnv.databaseName,
//   username: appEnv.databaseUsername,
//   password: appEnv.databasePassword,
//   host: appEnv.databaseHost,

//   logging: (query) => logger.debug(query)
// });
