const userService = require("../../../services/user-service.js");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      status: "Success",
      data: users
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
  getUsers,
  whoAmI,
  register,
  registerAdmin,
  login
};
