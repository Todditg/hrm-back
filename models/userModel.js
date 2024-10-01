import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  firstName: {type: String},
  lastName: {type: String},
});

export default model("User", UserSchema);
