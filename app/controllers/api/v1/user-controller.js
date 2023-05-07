const jwt = require("jsonwebtoken");
const userService = require("../../../services/user-service.js");

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
    console.log(users);
    res.status(200).json({
      status: "Success",
      data: {
        count: users.totalUser,
        users: users.data
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message
    });
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
    
    if (!user.data) {
      res.status(user.status_code).json({
        status: "Error",
        message: user.message
      });
      return;
    }
    
    res.status(201).json({
      status: "Success",
      message: user.message,
      data: {
        id: user.data.id,
        name: user.data.name,
        email: user.data.email,
        role: user.data.role,
      },
    });
  } catch (error) {
    res.status(422).json({
      status: "Error",
      message: error.message
    });
  }
}

const registerAdmin = async (req, res) => {
  try {
    const user = await userService.registerAdmin(req.body);    

    if (!user.data) {
      res.status(user.status_code).json({
        status: "Error",
        message: user.message
      });
      return;
    }
    
    res.status(201).json({
      status: "Success",
      message: user.message,
      data: {
        id: user.data.id,
        name: user.data.name,
        email: user.data.email,
        role: user.data.role,
      },
    });
  } catch (error) {
    res.status(422).json({
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
        status: "Error",
        message: user.message
      });
      return;
    }
    
    res.status(201).json({
      status: "Success",
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
    res.status(422).json({
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
