const mongoose=require("mongoose");

mongoose.connect(process.env.DATABASE)
.then(()=>{
     console.log("Happy from database")
})
.catch((err)=>{
    console.log(err);
})