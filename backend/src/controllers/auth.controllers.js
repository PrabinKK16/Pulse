import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);

  if (!name || !email || !password)
    throw new ApiError(400, "All fields required");

  const userExists = await User.findOne({ email });
  if (userExists)
    throw new ApiError(409, "User already exists");

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    })
    .json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password)))
    throw new ApiError(401, "Invalid credentials");

  const token = generateToken(user._id);

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
});

export const logout = asyncHandler((_, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      expires: new Date(0),
    })
    .json({ message: "Logged out successfully" });
});

export const getMe = asyncHandler((req, res) => {
    res.status(200).json(req.user);
});
