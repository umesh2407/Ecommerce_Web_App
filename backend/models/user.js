const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
      },
      avatar: {
        public_id: {
          type: String,
         
        },
        url: {
          type: String,
   
        },
      },
      role: {
        type: String,
        default: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
      resetPasswordToken: String,
      resetPasswordExpire: Date,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
