const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser)
    return {
      message: "user already exists",
    };
  const role = email === process.env.ADMIN_EMAIL ? "ADMIN" : "USER";
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

const userlogin = async (userData) => {
  const { email, password } = userData;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      message:
        "User not found!!! Please register or try again with different email",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      message: "Invalid Password! Please enter correct password",
    };
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
  );

  return {
    token,
  };
};

module.exports = {
  registerUser,
  userlogin,
};
