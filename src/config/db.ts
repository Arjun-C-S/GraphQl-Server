import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * This function connects to the database using the connection string provided in
 * the `DATABASE_URL` environment variable. If the connection is successful, a
 * success message is logged. If the connection fails, the error message is logged.
 *
 */

async function dbConnection() {
    try {
        const { DATABASE_URL } = process.env;

        await mongoose.connect(DATABASE_URL!);

        console.log('Database connected successfully...');
    } catch (error: any) {
        console.error(error.message);
    }
}

export { dbConnection };
