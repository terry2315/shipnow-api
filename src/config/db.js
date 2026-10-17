import mongoose from "mongoose";
import { env } from './env.config.js';
import { logger } from "../config/logger.config.js";

export const connectDB = async () => {

  try {

    await mongoose.connect(env.MONGODB_URI);

    logger.info('Conexión a MongoDB establecida correctamente');

  } catch (error) {

    logger.fatal(`Error de conexión a MongoDB: ${error.message}`);

    throw error;
  }
};
