import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    required: true,
    default: "customer",
  },

  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },

  address: {
    type: String,
  
  },

  phone: {
    type: String,
   
  },

  googleId: { type: String, unique: true, sparse: true },
  authProvider: { type: String, enum: ["local", "google"], default: "local" },
  profilePicture: { type: String },
});
const UserModel = mongoose.model("users", userSchema);

export default UserModel;



