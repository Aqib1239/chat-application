import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const SignUp = async (req, res) => {
    const { fullName, email, password } = req.body;
  
    try {
      // Check if the request body is missing
      if (!req.body) {
        return res.status(400).json({
          message: "Request body is missing",
        });
      }
  
      // Validate required fields
      if (!fullName || !email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
  
      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters",
        });
      }
  
      // Check if the user already exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
  
      // Save the user and generate a JWT token
      await newUser.save();
      generateToken(newUser._id, res);
  
      // Respond with success
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
  
    } catch (error) {
      console.error("Error in SignUp controller", error.message);
  
      // Handle unexpected server errors
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
  
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if(!email || !password){
        return res.status(400).json({
            message: "All fields are required",
        });
      }

      const user = await User.findOne({email});

      if(!user){
        return res.status(400).json({
            message: "Invalid credentials"
        });
      }
      const isMatchPassword = await bcrypt.compare(password, user.password);

      if(!isMatchPassword){
        return res.status(400).json({
            message: "Invalid credentials"
        });
      }

      generateToken(user._id, res);
      res.status(200).json({
        success: true,
        message: "Login successfully",
        data: user
      });
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const Logout = async (req, res) => {
    try {
      res.cookie("jwt", "", {
        maxAge: 0 });
        res.status(200).json({
            success: true,
            message: "Logout successfully"
        });
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({
                message: "Profile picture is required"
            });
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url
        }, {new: true});

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User is authenticated",
            data: req.user
        });
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}