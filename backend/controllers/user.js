const User = require("../models/user");

// Get User Detail
exports.getUserDetails = async (req, res) => {
    const user = await User.findById(req.user.user);
  
    res.status(200).json({
      success: true,
      user,
    });
  };

