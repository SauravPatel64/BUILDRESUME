
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";

//GENERATE A TOKEN JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


export const registerUser = async (req,res) => {
  try{
    const  {name, email, password} = req.body;


    //check if user already exists or not
    const userExists = await User.findOne({email})
    if(userExists){
      return res.status(400).json({message:"user already exists"})
    }
    if(password.length < 8){
      return res.status(400).json({success:false, message:"Password must be atleast of 8 characters"})
    }

    //Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt)

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedpassword
    })
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email:user.email,
      token:generateToken(user._id)
    })
  }
  catch(error){
    res.status(401).json({
      message:"Server  error",
      error: error.message
    })
  }
}

//Login Function
export const loginUser = async (req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    //commpare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(401).json({
      message: "Server  error",
      error: error.message,
    });
  }
}


// GETUSER PROFILE FFUNCTION

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if(!user){
             return res.status(404).json({message:"User not found"});
    }
    res.json({user})

  }
  catch(error){
    res.status(401).json({
      message: "Server  error",
      error: error.message,
    });
  }

}





// import User from "../models/userModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Generate a JWT token
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // REGISTER USER
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if all fields are filled
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please fill all fields" });
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Check password length
//     if (password.length < 8) {
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 8 characters" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("❌ Register Error:", error.message);
//     res.status(500).json({
//       message: "Server error during registration",
//       error: error.message,
//     });
//   }
// };

// // LOGIN USER
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate request
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide email and password" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("❌ Login Error:", error.message);
//     res.status(500).json({
//       message: "Server error during login",
//       error: error.message,
//     });
//   }
// };

// // GET USER PROFILE
// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ user });
//   } catch (error) {
//     console.error("❌ Get Profile Error:", error.message);
//     res.status(500).json({
//       message: "Server error fetching profile",
//       error: error.message,
//     });
//   }
// };
