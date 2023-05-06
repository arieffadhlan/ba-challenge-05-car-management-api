const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user-repository.js");
const SALT = 10;

const encryptPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, SALT);
    return encryptedPassword;
  } catch (error) {
    return error;
  }
}

const checkPassword = async (password, encryptedPassword) => {
  try {
    const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);
    return isPasswordCorrect;
  } catch (error) {
    return error;
  }
}

const createToken = (payload) => {
  return jwt.sign(payload, "secret");
}

const getUsers = async (req, res) => {
  try {
    const users = await userRepository.getUsers();
    const filteredUserData = users
      .filter((user) => user.role !== "Superadmin")
      .map((user) => {
        return {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
          created_at: user?.created_at,
          updated_at: user?.updated_at
        }
      });
    
    return filteredUserData
  } catch (error) {
    
  }
}

const register = async (requestBody) => {
  const { name, email, password } = requestBody;
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  const isUserExist = await userRepository.getUserByEmail(email);
  if (isUserExist) {
    return {
      status_code: "409",
      status: "Error",
      message: "Email already exists.",
    }
  }

  const encryptedPassword = await encryptPassword(password);
  return userRepository.createUser({ 
    name, 
    email, 
    password: encryptedPassword,
    role: "Member"
  });
}

const login = async (requestBody) => {
  const { email, password } = requestBody;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    return {
      status_code: "401",
      status: "Error",
      message: "Invalid email or password.",
    }
  }
  
  const isPasswordCorrect = await checkPassword(password, user.password);
  console.log(isPasswordCorrect)
  if (!isPasswordCorrect) {
    return {
      status_code: "401",
      status: "Error",
      message: "Invalid email or password.",
    }
  }

  const token = createToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  user.token = token;
  
  return {
    status: "Success",
    message: "Kamu telah berhasil login.",
    data: user
  }
}

const registerAdmin = async (requestBody) => {
  const { name, email, password } = requestBody;
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  const isUserExist = await userRepository.getUserByEmail(email);
  if (isUserExist) {
    return {
      status_code: "409",
      status: "Error",
      message: "Email already exists.",
    }
  }

  const encryptedPassword = await encryptPassword(password);
  return userRepository.createUser({ 
    name, 
    email, 
    password: encryptedPassword,
    role: "Admin"
  });
}

module.exports = {
  getUsers,
  register,
  registerAdmin,
  login
};
