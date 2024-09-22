const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
      type:Number,
      required:true
    },
    Work:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    cPassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            Name:{
                type:String,
                required:true
            },
            Email:{
                type:String,
                required:true
            },
            Phone:{
              type:Number,
              required:true
            },
            Work:{
                type:String,
                required:true
            },
            Message:{
                type:String,
                required:true
            }
        }
    ],
    tokens:[
        {
           token:{
            type:String,
            required:true
           } 
        }
    ]
})

userSchema.pre('save',async function (next) {// this is middleware 
    if(this.isModified("Password")){
       this.Password=await bcrypt.hash(this.Password,12);
       this.cPassword=await bcrypt.hash(this.cPassword,12);
     }
    next();
})

userSchema.methods.generateAuthToken= async function(){
    try{
        let tokennir=jwt.sign({_id:this._id},process.env.SECRET_KEY);//this creates token
        this.tokens=this.tokens.concat({token:tokennir});
        await this.save();
        return tokennir;// this async function alawys have return function
    }
    catch(err){
      res.send("Error");
    }
}

userSchema.methods.addmessages= async function(Name,Message,Work,Phone,Email){
    try{
        this.messages=this.messages.concat({Name,Message,Work,Phone,Email});
        await this.save();// this.save is must to save
    }
    catch(err){
      res.send("Error");
    }
}

const User=mongoose.model("User",userSchema);
module.exports=User;