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

const getUsers = async () => {
  try {
    const users = await userRepository.getUsers();
    const userData = await users
      .map((user) => {
        return {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        }
      });
    const totalUser = await userRepository.getTotalUser();
    
    return {
      totalUser,
      data: userData
    };
  } catch (error) {
    throw new Error("Failed get car data.");
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
      status_code: 409,
      message: "Email already exists.",
    }
  }

  const encryptedPassword = await encryptPassword(password);
  const user = await userRepository.createUser({ 
    name, 
    email, 
    password: encryptedPassword,
    role: "Member"
  });

  return {
    message: "Congrats, your account has been successfully created.",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
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
      status_code: 409,
      message: "Email already exists.",
    }
  }

  const encryptedPassword = await encryptPassword(password);
  const user = await userRepository.createUser({ 
    name, 
    email, 
    password: encryptedPassword,
    role: "Admin"
  });

  return {
    message: "Congrats, your account has been successfully created.",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }
}

const login = async (requestBody) => {
  const { email, password } = requestBody;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    return {
      status_code: 401,
      message: "Invalid email or password.",
    }
  }
  
  const isPasswordCorrect = await checkPassword(password, user.password);
  console.log(isPasswordCorrect)
  if (!isPasswordCorrect) {
    return {
      status_code: 401,
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
    message: "Kamu telah berhasil login.",
    data: user
  }
}

module.exports = {
  getUsers,
  register,
  registerAdmin,
  login
};
