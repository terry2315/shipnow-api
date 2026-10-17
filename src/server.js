import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from './config/env.config.js';
import dns from 'node:dns';
import { logger } from "./config/logger.config.js";


dns.setServers(['1.1.1.1', '8.8.8.8']);

const PORT = env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(`Servidor Shipnow escuchando en el puerto ${PORT}`);
    });

    server.on('error', (error) => {
      logger.fatal(`Error critico del servidor: ${error.message}`)
    },
      process.exitCode = 1
    );

  } catch (error) {
    logger.fatal(`Error al arrancar el servidor: ${error.message}`);
    process.exit(1);
  }
};

startServer();
