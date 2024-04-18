import express, { urlencoded } from 'express';
import { dbConnection } from './db/db.js';
import { configDotenv } from 'dotenv';
const app = express();;

configDotenv();

const port = process.env.PORT || 3000;

dbConnection()


app.use(express.json());
app.use(express.urlencoded());;

import { cakeRouter } from './routes/cakes.js';


app.use('/api/v1/cakes', cakeRouter);


app.listen(port, () => {
    console.log(`app is listening on ${port}`);
})