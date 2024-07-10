const User = require("../models/user");

  // Get all users(admin)
  exports.getAllUser = async (req, res) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  };
  
  // Get single user (admin)
  exports.getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
           return res.status(400).json({ message: "User does not exist with Id" });
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  };
  
  // Update User Role -- Admin
  exports.updateUserRole = async (req, res) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
         message: "Updated User Role successfully"
      });
  };
  
  // Delete User --Admin
  exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
        return res.status(400).json({ message: "User does not exist with Id" });
    }
  
    // const imageId = user.avatar.public_id;
  
    // await cloudinary.v2.uploader.destroy(imageId);
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  };
