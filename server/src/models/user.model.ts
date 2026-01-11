import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  status: { 
    type: String, 
    enum: ["active", "inactive"], 
    default: "active" }
}, 
{ 
    timestamps: true 
});

const User = mongoose.model("User", userSchema);

export default User;