require("dotenv").config();

const http = require("http");
const app = require("./app");
const env = require("./config/env");
const logger = require("./config/logger");
const { connectPrisma, disconnectPrisma } = require("./config/prisma");

const server = http.createServer(app);

const start = async () => {
    try {
        await connectPrisma();

        server.listen(env.PORT, () => {
            logger.info(`Server started on port ${env.PORT}`);
        });
    } catch (err) {
        logger.error("Failed to start server", { error: err.message });
        process.exit(1);
    }
};

const shutdown = async (signal) => {
    logger.info(`Received ${signal}, shutting down`);
    server.close(async () => {
        await disconnectPrisma();
        process.exit(0);
    });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start();
