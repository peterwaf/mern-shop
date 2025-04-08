const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"], //ONLY ALLOW ADMIN AND USER
        default: "USER"
    }
},{timestamps: true});

//hash password

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Move to the next middleware
});

//compare password
userSchema.methods.comparePassword = async function (clientPassword) {
    try {
      return await bcrypt.compare(clientPassword, this.password); //true or false
    } catch (error) {
      console.error("Error while comparing passwords:", error);
      throw error; // Properly propagating the error
    }
  };

module.exports = mongoose.model("User", userSchema);