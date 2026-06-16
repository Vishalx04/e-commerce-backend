const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

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
  const hashedPassword = await bcrypt.hash(password,10);

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

module.exports = {
  registerUser,
};
