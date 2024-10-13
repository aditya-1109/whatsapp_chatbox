import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String },
    number: { type: Number, required: true}, 
    contacts: { type: Array, default: [] }, 
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
