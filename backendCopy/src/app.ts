import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import functions from 'firebase-functions';
import { comments } from './comment/comment.route';
import { issues } from './Issue/issues.route';
import { projects } from './project/project.route';
import { apiHealthCheck } from './routes/apiHealthCheck';
import { users } from './user/user-route';
import errorHandler from './utils/errorHandling';
import logger from './utils/logger';

dotenv.config(); // Configure the dotenv for using enviornment variable

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3500;

app.use('/api/status', apiHealthCheck); // Api healthcheck for the server check
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/issues', issues);
app.use('/api/comments', comments);

app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: 'Hello From the backend of the final project' });
});
app.use(errorHandler); // This is central error handling function

app.listen(port, () => {
  logger.info(`Application is listening at http://localhost:${port}`);
});

export const api = functions.https.onRequest(app);
