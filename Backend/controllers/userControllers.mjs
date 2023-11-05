import UserModel from "../models/UsersModel.mjs";
import { saveuserErrorHandler } from "../middlewares/errorhandler.mjs";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const Secret_Key = process.env.SECRET_key;

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password, role } = req.body;
    const user = new UserModel({
      firstname,
      lastname,
      email,
      username,
      password,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    const era = saveuserErrorHandler(error);
    res.status(500).json(era);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const listAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstname, lastname, username, email, password } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { firstname, lastname, username, email },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User updated successfully", user });
    }
  } catch (error) {
    res.status(500).json({ error: "User update failed" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "User deletion failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginuser = await UserModel.findOne({ email });

    if (!loginuser || !(await bcrypt.compare(password, loginuser.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      const token = jwt.sign(
        { userId: loginuser._id, email: loginuser.email },
        Secret_Key,
        { expiresIn: "24h" }
      );

      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ message: "Login successful", token });
    }
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyAuthentication = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decodedToken = jwt.verify(token, Secret_Key);
    if (decodedToken) {
      res.status(200).json({ isAuthenticated: true });
    }
  } catch (error) {
    console.error("Error in verifyAuthentication:", error);

    return res.status(401).json({ isAuthenticated: false });
  }
};

export const getUserRole = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decodedToken = jwt.verify(token, Secret_Key);
    if (decodedToken) {
      const userId = decodedToken.userId;

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const userRole = user.role;

      res.status(200).json({ role: userRole });
    }
  } catch (error) {
    console.error("Error in getUserRole:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
