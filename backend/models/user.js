const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require("crypto");

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


// // Generating Password Reset Token
// UserSchema.methods.getResetPasswordToken = function () {
//   // Generating Token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding resetPasswordToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };


const User = mongoose.model('User', UserSchema);

module.exports = User;
