const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  try {
    const { name, email, password } = userData;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const role = email === process.env.ADMIN_EMAIL ? "ADMIN" : "USER";

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const userlogin = async (userData) => {
  try {
    const { email, password } = userData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(
        "User not found. Please register or try again with a different email."
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      // {
      //   expiresIn: "7d",
      // }
    );

    return {
      token,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  userlogin,
};