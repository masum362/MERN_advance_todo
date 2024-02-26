import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashString = async (userVal) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedValue = bcrypt.hashSync(userVal, salt);
  return hashedValue;
};

export const compareStrings = async (userVal, password) => {
  const isMatch = await bcrypt.compare(userVal, password);
  return isMatch;
};

export const createJwtToken = (id) => {
  const token = jwt.sign({ userId: id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};
