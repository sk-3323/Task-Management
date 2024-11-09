import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const tokenId = req.cookies.token;
    if (!tokenId) {
      return res.status(401).json({ message: "You Are Not Authenticated" });
    }
    jwt.verify(tokenId, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Token is Invalid" });
      }
      req.userId = payload.id;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
