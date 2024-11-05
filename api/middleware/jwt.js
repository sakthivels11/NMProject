import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  // const token = req.body.token
  // console.log(token)
  // console.log(process.env.JWT_KEY)

  if (!token) return next(createError(401,"You are not authenticated!"))

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    console.log("Hello from jwt1")
    if (err) return next(createError(403,{"Token is not valid!": err}));
    console.log("Hello from jwt2")
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    console.log("Hello from jwt3")
    next()
  });
};
