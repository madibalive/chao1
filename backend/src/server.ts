import app from "./app";
import { appEnv } from "./utils/env";
import { logger } from "./utils/logger";
import { sequelize } from "./config/sequelize";

logger.info(`Server environment: ${appEnv.envType}`, appEnv);
const { port } = appEnv;

// ===== Running server =====
// sequelize.sync().then(() => {
//   app.listen(port, () => {
//     logger.info(`Server running at ${port}`);
//   });
// });

const server = app.listen(port, async () => {
  try {
    // await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Database connection has been established successfully");
    process.stdout.write(`Server is running on http://localhost:${port}/api`);
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
});

// handle all socket operations
import io from "./lib/io";
io(server);
