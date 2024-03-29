import mongoose from 'mongoose';



export const dbCreateConnection = async (): Promise<mongoose.Connection | null> => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connection success.');
    return mongoose.connection;
  } catch (err) {
    console.log(err);
  }
  return null;
};