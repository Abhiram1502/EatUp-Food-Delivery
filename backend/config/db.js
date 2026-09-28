const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Conneted Successfully!.");
    }catch(error){
        console.log("Connetion Failed");
        console.log(error.message);
        process.exit(1);
    }
}
module.exports =connectDB;