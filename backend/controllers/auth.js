const User = require("../models/user");
const orderModel = require("../models/order");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../middlewares/auth");
const crypto = require("crypto");
const nodemailer = require('nodemailer');

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validate email format
    if (!isEmailValid(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: 'user', // Assuming default role for new users
    });

    // Save user to database
    await newUser.save();

    // Fetch user again to include additional fields or validation
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "User not found after registration" });
    }

    // Generate JWT token
    const token = generateJwtToken(user);

    // Return success response
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
      },
      token
    });
  } catch (err) {
    console.error("Error in signUpUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const userId = req.user.user; 

    // Validate email format
    if (!isEmailValid(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Find user by ID
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;

    // Check if password is provided and hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updated user to database
    await user.save();

    // Generate JWT token with updated user information
    const token = generateJwtToken(user);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token
    });

  } catch (err) {
    console.error("Error in updateUserProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateJwtToken(user);

    // res.status(200).json({ message: "Login successful", token });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// Logout User
exports.logout = async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  };


  
  const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
  };
  
  const sendOTPEmail = async (email, otp) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Replace with your Gmail address
        pass: process.env.PASSWORD, // Replace with your Gmail password
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
    };
  
    await transporter.sendMail(mailOptions);
  };

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const otp = generateOTP();
      user.otp = otp;
      user.otpExpiry = Date.now() + 3600000; // OTP valid for 1 hour
      await user.save();
  
      await sendOTPEmail(email, otp);
  
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
  
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
  
      res.status(200).json({ message: 'OTP verified' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Controller function to handle password reset
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;

    // Save updated user object
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Password reset failed:", error);
    res.status(500).json({ success: false, message: "Failed to reset password." });
  }
};

//orders
exports.getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user.user })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//orders
exports.getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort("-createdAt");
    res.json(orders);
  } catch (error) {
    console.error("Error while getting all orders:", error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error: error.message || error
    });
  }
};

//order status
exports.orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};