const jwt = require("jsonwebtoken");

 const validateJWTToken = (req, res, next) => {
  try {
    const token = getAuthorizationToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("Decoded token", decodedToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if(decodedToken.exp < currentTime) {
      return res.status(401).json({ sucess: false, message: "Token Expired" });
    }
    req.body.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ sucess: false, message: "Invalid/Expired Token" });
  }
};

function getAuthorizationToken(req) {
  if(process.env.SESSION_COOKIE_NAME) {
    return req.cookies[process.env.SESSION_COOKIE_NAME];
  }
  return req?.headers?.authorization?.split(" ")[1];
}

module.exports = validateJWTToken;