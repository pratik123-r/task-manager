const allowedEnvs = new Set(["development", "test", "production"]);
const allowedLogLevels = new Set(["error", "warn", "info", "debug"]);

const parsePort = (value) => {
  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a positive integer");
  }
  return port;
};

const buildEnv = () => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const portRaw = process.env.PORT || "3000";
  const databaseUrl = process.env.DATABASE_URL;
  const logLevel = process.env.LOG_LEVEL || "info";

  if (!allowedEnvs.has(nodeEnv)) {
    throw new Error("NODE_ENV must be one of: development, test, production");
  }

  if (!databaseUrl || !databaseUrl.trim()) {
    throw new Error("DATABASE_URL is required");
  }

  if (!allowedLogLevels.has(logLevel)) {
    throw new Error("LOG_LEVEL must be one of: error, warn, info, debug");
  }

  return {
    NODE_ENV: nodeEnv,
    PORT: parsePort(portRaw),
    DATABASE_URL: databaseUrl,
    LOG_LEVEL: logLevel
  };
};

let env;

try {
  env = buildEnv();
} catch (error) {
  console.error("Invalid environment variables:", error.message);
  process.exit(1);
}

module.exports = env;
