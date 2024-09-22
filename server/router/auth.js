const express = require("express");
const User = require("../model/Useschema");
const bcrypt=require("bcrypt");
const authentication=require("../middleware/authentication");
const cors = require('cors');// this is new very very very important
const router = express.Router();

router.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend's origin
    credentials:true 
}));

router.use(express.json());// this is very important for to show the data in postman router.use

router.post('/register', async (req, res) => {

    const { Name, Email, Phone, Work, Password, cPassword } = req.body;
    if (!Name || !Email || !Phone || !Work || !Password || !cPassword) {
        return res.status(400).json({ error: "Plz fill the all details" })
    }

    try {
        const userExist = await User.findOne({ Email: Email });
        if (userExist) {
            return res.status(409).json({ error: "Email already Exist" });
        } else if (Password != cPassword) {
            return res.status(400).json({ error: "Password And cPassword are not same" });
        }

        const user = new User({ Name, Email, Phone, Work, Password, cPassword });
        //yeha phele
        const data = await user.save();// save by constant user.save()

        if (data) {
            res.status(201).json({ message: "User Sigin Successfully" })
        } else {
            res.status(500).json({ error: "Something fail" })
        }

    } 
    
    catch (e) {
        res.status(900).send(e);
    }
});

router.post('/signin', async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(401).json({ error: "Please fill all the details" });
    }

    try {
        const userLogin = await User.findOne({ Email: Email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(Password, userLogin.Password);
            if (isMatch) {
                const tokennir = await userLogin.generateAuthToken();//this is await function
                res.status(201).json({ message: "User Login Successfully", token: tokennir });//token: tokennir this sends token into login pages
            } else {
                res.status(401).json({ error: "Invalid Password" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/about', authentication,(req, res) => {
    res.send(req.user);
});

router.get('/contact',authentication,(req,res)=>{
    res.send(req.user);
});

router.post('/senddata',async(req,res)=>{
    const { Name,Message,Work,Phone,Email } = req.body;
    if (!Name || !Message || !Phone || !Work ||!Email) {
        return res.status(400).json({ error: "Plz fill the all details" })
    }

    try {
        const userID=await User.findOne({Name:Name});
        if(userID){
             await userID.addmessages(Name, Message, Work, Phone, Email);
             res.status(201).json({ message: "Message sent successfully" });
        }

    }catch (error) {
        res.status(500).json({ error: "An error occurred while sending the message" });
    }
});

module.exports = router;