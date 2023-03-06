import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { apiHealthCheck } from './routes/apiHealthCheck';
import errorHandler from './utils/errorHandling';
import logger from './utils/logger'; // This is Logger file created based on pino for pretty logging

dotenv.config(); // Configure the dotenv for using enviornment variable

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3500;

app.use('/api/status', apiHealthCheck); // Api healthcheck for the server check

app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: 'Hello From the backend of the final project' });
});

app.listen(PORT, async () => {
  logger.info(`Application is listening at http://localhost:${PORT}`);
});
app.use(errorHandler); // This is central error handling function
