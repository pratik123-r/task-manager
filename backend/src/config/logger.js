const env = require("./env");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const threshold = levels[env.LOG_LEVEL] ?? levels.info;

const log = (level, message, meta) => {
  if (levels[level] > threshold) return;

  const payload = {
    ts: new Date().toISOString(),
    level,
    message
  };

  if (meta) payload.meta = meta;
  process.stdout.write(`${JSON.stringify(payload)}\n`);
};

module.exports = {
  error: (message, meta) => log("error", message, meta),
  warn: (message, meta) => log("warn", message, meta),
  info: (message, meta) => log("info", message, meta),
  debug: (message, meta) => log("debug", message, meta)
};
