import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { ERROR_CODES, MESSAGE } from './global/global.vars.js';
import commonRoute from './routes/common.routes.js';
import { initializeFirebaseApp } from './db/db.js';

dotenv.config();
initializeFirebaseApp();

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb', extended: true }));

//routes
app.use('/api', commonRoute);

app.all('*', (req, res) => {
  res.status(400).json({
    status: 400,
    message: MESSAGE['400'],
    errorCode: ERROR_CODES.BAD_REQUEST,
  });
});

const PORT = 4040 || process.env.PORT;
app.listen(PORT, () => console.log(`⚡️Server is up and running locally on ${PORT}`));
