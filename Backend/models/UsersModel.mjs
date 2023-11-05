import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { isEmail } = validator;
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "please enter password"],
    unique: true,
    validate: [isEmail, "please insert a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "the minimum number of characters is 6"],
  },
  role: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
