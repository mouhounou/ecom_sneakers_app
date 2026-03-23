const mongoose = require('mongoose');

const toConnect = async () =>{
   try {
      mongoose.connect(process.env.MONGO_URL);
      console.log('====================================');
      console.log("connected to DB");
      console.log('====================================');
   } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
   }
}

module.exports =  toConnect;
