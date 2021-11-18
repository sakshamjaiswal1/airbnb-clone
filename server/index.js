const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute=require('./routes/Pins')
const userRoute=require('./routes/Users')

dotenv.config();

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));
app.use('/api/pins',pinRoute)
app.use('/api/users',userRoute)


  
app.listen(5000, () => {
  console.log("Backend is running");
});
