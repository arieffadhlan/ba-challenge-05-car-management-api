const jwt = require("jsonwebtoken");
const userService = require("../../../services/user-service");

const authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = jwt.verify(token, "secret");

    req.user = tokenPayload;
    next();
  } catch (err) {
    res.status(401).json({
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
      message: "Unauthorize"
    });
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      status: "Success",
      data: users
    })
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: error.message
    })
  }
}

const whoAmI = (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "Success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  });
}

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);    
    if (user.status === "Error") {
      res.status(user.status_code).json({
        status: user.status,
        message: user.message
      });
      return;
    }
    
    res.status(201).json({
      status: "Success",
      message: "Congrats, your account has been successfully created.",
      data: {
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message
    });
  }
}

const registerAdmin = async (req, res) => {
  try {
    const user = await userService.registerAdmin(req.body);    

    if (user.status === "Error") {
      res.status(user.status_code).json({
        status: user.status,
        message: user.message
      });
      return;
    }
    
    res.status(201).json({
      status: "Success",
      message: "Congrats, your account has been successfully created.",
      data: {
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message
    });
  }
}

const login = async (req, res) => {
  try {
    const user = await userService.login(req.body);

    if (!user.data) {
      res.status(user.status_code).json({
        status: user.status,
        message: user.message
      });
      return;
    }
    
    res.status(201).json({
      status: user.status,
      message: user.message,
      data: {
        id: user.data.id,
        name: user.data.name,
        email: user.data.email,
        role: user.data.role,
        token: user.data.token
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  authorize,
  authorizeSuperadmin,
  authorizeAdmin,
  getUsers,
  whoAmI,
  register,
  registerAdmin,
  login
};
