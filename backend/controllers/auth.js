const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../middlewares/auth");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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


const getResetPasswordToken = () => {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return { resetToken, resetPasswordToken, resetPasswordExpire };
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Get ResetPassword Token
  const { resetToken, resetPasswordToken, resetPasswordExpire } = getResetPasswordToken();

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpire = resetPasswordExpire;

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`;

  const message = `Your password reset token is: \n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.error("Error sending email:", error); // Enhanced error logging

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({ message: "Email could not be sent", error: error.message }); // Enhanced response
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Reset Password Token is invalid or has been expired" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Set new password
  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = generateJwtToken(user);

  res.status(200).json({ message: "Password reset successful", token });
};

// Update User password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Ensure trimming any extra spaces around passwords
    const trimmedOldPassword = oldPassword.trim();
    const isPasswordMatched = await bcrypt.compare(trimmedOldPassword, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Old Password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the new password before saving
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    const token = generateJwtToken(user);

    res.status(200).json({ message: "Password updated succesfully", token });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
