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
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  googleId: { type: String, unique: true, sparse: true },
  authProvider: { type: String, enum: ["local", "google"], default: "local" },
  profilePicture: { type: String },
});
const UserModel = mongoose.model("users", userSchema);

export default UserModel;



