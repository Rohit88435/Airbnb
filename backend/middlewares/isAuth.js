import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "user donesn't have token" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "user donesn't have a valid token" });
    }

    req.userId = verifyToken.userId; // <-- FIXED HERE

    next();
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

export default isAuth;
