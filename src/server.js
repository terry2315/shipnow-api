import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from './config/env.config.js';
import dns from 'node:dns';


dns.setServers(['1.1.1.1', '8.8.8.8']);

const PORT = env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(`Error al iniciar el servidor: ${error.message}`);
    process.exit(1);
  }
};

startServer();
