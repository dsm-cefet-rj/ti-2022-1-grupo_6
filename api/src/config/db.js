const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://psw:${process.env.ATLAS_PASSWORD}@cluster0.tbhn8.mongodb.net/techbuyretry`
      // {
      //   useNewUrlParser: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      //   useUnifiedTopology: true,
      // }
    );

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

exports.connectDB = connectDB;
