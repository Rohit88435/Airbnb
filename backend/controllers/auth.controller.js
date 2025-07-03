import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let existUser = await User.findOne({ email }).populate(
      "listing",
      "title description image1 image2 image3 rent category city landmark"
    );

    if (existUser) {
      return res.status(400).json({ message: "User is already exist" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should not less than 8 characters" });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: "true",
      secure: (process.env.NODE_ENVIRONMENT = "production"),
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Sign up error  ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not exist" });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: (process.env.NODE_ENVIRONMENT = "production"),
      sameSite: "strict",
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `sign in error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `log out error ${error}` });
  }
};
