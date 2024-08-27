import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  // createdAt: {type: Date, default: Date.now},
  // updatedAt: {type: Date},
   firstName: {type: String},
   lastName: {type: String},
  // role: {type: String, enum: ['admin', 'supervisor', 'operator', 'user'], default: 'user'}
});

export default model("User", UserSchema);
