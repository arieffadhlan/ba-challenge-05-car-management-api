const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(token, "secret");

    req.user = tokenPayload;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Error",
      message: "Unauthorize"
    });
  }
}

const authorizeSuperadmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "Superadmin") {
      return res.status(403).json({
        status: "Error",
        message: "You dont have permission for this request."
      });
    }
    
    next();
  } catch (error) {
    res.status(401).json({
      status: "Error",
      message: "Unauthorize"
    });
  }
}

const authorizeAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    
    if (role !== "Superadmin" && role !== "Admin") {
      return res.status(403).json({
        status: "Error",
        message: "You dont have permission for this request."
      });
    }
    
    next();
  } catch (error) {
    res.status(401).json({
      status: "Error",
      message: "Unauthorize"
    });
  }
}

module.exports = {
  authorize,
  authorizeSuperadmin,
  authorizeAdmin
};