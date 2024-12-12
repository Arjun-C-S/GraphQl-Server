import mongoose from 'mongoose';

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
