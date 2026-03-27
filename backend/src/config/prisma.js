const { PrismaClient } = require("@prisma/client");
const logger = require("./logger");

const prisma = new PrismaClient({
  log: ["warn", "error"]
});

const connectPrisma = async () => {
  await prisma.$connect();
  logger.info("Prisma connected");
};

const disconnectPrisma = async () => {
  await prisma.$disconnect();
  logger.info("Prisma disconnected");
};

module.exports = {
  prisma,
  connectPrisma,
  disconnectPrisma
};
