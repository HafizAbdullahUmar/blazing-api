import mongoose from 'mongoose';



 const dbCreateConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connection success.');
    return mongoose.connection;
  } catch (err) {
    console.log(err);
  }
  return null;
};
module.exports = dbCreateConnection