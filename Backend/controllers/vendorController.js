const Vendor = require('../models/Vendor');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.Name

const vendorRegister = async(req, res) => {
    const { username, email, password } = req.body;
    /*if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      const { username, email, password } = req.body;*/

    try{
        const vendorEmail = await Vendor.findOne({email});
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });

        await newVendor.save();

        res.status(201).json({message: "Vendor registered successfully !!!"})
        console.log("registered")
    }catch(error){
        console.error(error);
        res.status(500).json({error : "Internal Server Error"})
    }

} 

const vendorLogin = async(req, res) => {
    const {email, password} = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if(!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({error: "Invalid Username or Password"})
        }
        const token = jwt.sign({vendorId: vendor._id}, secretKey, {expiresIn: "1h"})

        res.status(200).json({Success: "Login Successful!", token})
        console.log(email, token);
    }catch(error){

    }
}



module.exports = { vendorRegister, vendorLogin }