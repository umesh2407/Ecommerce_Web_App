const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../middlewares/auth");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// SignUP
exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password, avatar, role } = req.body;

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
      avatar,
      role,
    });

    // Save user to database
    await newUser.save();
    const user = await User.findOne({ email });

    const token = generateJwtToken(user);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
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

    res.status(200).json({ message: "Login successful", token });
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

// const getResetPasswordToken = () => {
//     // Generating Token
//     const resetToken = crypto.randomBytes(20).toString("hex");
  
//     // Hashing and adding resetPasswordToken to userSchema
//     const resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");
  
//     const resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
//     return { resetToken, resetPasswordToken, resetPasswordExpire };
//   };
  


// // Forgot Password
// exports.forgotPassword = async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(res.status(404).send({ message: 'User not found' }));
//   }

//   // Get ResetPassword Token
//   const resetToken = getResetPasswordToken();

//   await user.save({ validateBeforeSave: false });

//   const resetPasswordUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/password/reset/${resetToken}`;

//   const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: `Ecommerce Password Recovery`,
//       message,
//     });

//     res.status(200).json({
//       success: true,
//       message: `Email sent to ${user.email} successfully`,
//     });
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save({ validateBeforeSave: false });

//     return next(res.status(404).send({ message: 'User not found' }));
//   }
// };

// // Reset Password
// exports.resetPassword = async (req, res, next) => {
//   // creating token hash
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });

//   if (!user) {
//     return next(res.status(404).send({ message:  "Reset Password Token is invalid or has been expired" }));
//   }

//   if (req.body.password !== req.body.confirmPassword) {
//     return next(res.status(400).send({ message:  "Password does not match" }));
//   }

//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   sendToken(user, 200, res);
// };
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

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

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
    return res.status(400).json({ message: "Reset Password Token is invalid or has expired" });
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
