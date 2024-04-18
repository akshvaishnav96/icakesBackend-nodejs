import mongoose, { mongo } from 'mongoose';

import { configDotenv } from "dotenv";


configDotenv();


async function dbConnection() {
    try {

        const connection = await mongoose.connect(process.env.MONGODB_URL);



    } catch (error) {
        console.log(error);
    }

}

export { dbConnection }