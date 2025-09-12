import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
       const dbConnection =  await mongoose.connect(process.env.MONGOOSE_URL);
        console.log(`Database connected succesufull: ${dbConnection.connection.host}`);
    }
    catch(error){
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;