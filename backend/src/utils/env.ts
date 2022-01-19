import dotenv from "dotenv";
import env from "env-var";
import * as path from "path";

export type EnvType = "production" | "development" | "test";

type AppEnv = {
  envType: EnvType;
  port: number;
  jwtSecret: string;
  jwtExpirationSeconds: number;
  databaseHost: string;
  databaseName: string;
  databaseUsername: string;
  databasePassword: string;
};
export const AUTH0_DOMAIN = "https://dev-tgdlv40g.us.auth0.com";
export const WEB_URL = "localhost:3000";

function loadEnv(): AppEnv {
  const envType: EnvType = env
    .get("NODE_ENV")
    .default("development")
    .asEnum(["production", "development", "test"]);
  // load environment
  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${envType}`),
  });

  // const port: number = env.get("PORT").default("5000").asInt();
  const port: number = 5000;
  const jwtSecret: string = env.get("JWT_SECRET").required().asString();
  const jwtExpirationSeconds: number = env
    .get("JWT_EXPIRATION_SECONDS")
    .default(86400)
    .asIntPositive();
  const databaseHost: string = env.get("DATABASE_HOST").required().asString();
  const databaseName: string = env.get("DATABASE_NAME").required().asString();
  const databaseUsername: string = env
    .get("DATABASE_USERNAME")
    .required()
    .asString();
  const databasePassword: string = env
    .get("DATABASE_PASSWORD")
    .required()
    .asString();

  const appEnv: AppEnv = {
    envType,
    port,
    jwtSecret,
    jwtExpirationSeconds,
    databaseHost,
    databaseName,
    databaseUsername,
    databasePassword,
  };
  return appEnv;
}

export const appEnv: AppEnv = loadEnv();
