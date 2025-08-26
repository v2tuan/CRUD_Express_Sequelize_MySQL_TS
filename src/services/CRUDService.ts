import bcrypt from "bcrypt";
import db from "../models/index";

// Định nghĩa interface cho dữ liệu user
interface IUser {
  id?: number;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  gender: string | boolean;
  image?: string;
  roleId: string;
}

const salt = bcrypt.genSaltSync(10);

// Hash password
const hashUserPassword = async (password: string): Promise<string> => {
  try {
    // ⚠️ Lưu ý: Code cũ hash cứng "B4C0/\/", mình chỉnh lại hash đúng `password`
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    throw error;
  }
};

// Create new user
const createNewUser = async (data: IUser): Promise<string> => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      address: data.address,
      phoneNumber: data.phoneNumber,
      lastName: data.lastName,
      firstName: data.firstName,
      gender: data.gender === "1" ? true : false,
      image: data.image,
      roleId: data.roleId,
    });
    return "Create user success!";
  } catch (error) {
    throw error;
  }
};

// Get all users
const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await db.User.findAll({ raw: true });
    return users;
  } catch (error) {
    throw error;
  }
};

// Get user by id
const getUserInfoById = async (userId: number | string): Promise<IUser | {}> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user ? user : {};
  } catch (error) {
    throw error;
  }
};

// Update user
const updateUserData = async (data: IUser): Promise<IUser[] | void> => {
  try {
    const user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      user.email = data.email;
      user.address = data.address;
      user.phoneNumber = data.phoneNumber;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      await user.save();

      const allUsers = await db.User.findAll();
      return allUsers;
    }
  } catch (error) {
    throw error;
  }
};

// Delete user
const deleteUserById = async (userId: number | string): Promise<void> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });
    if (user) {
      await user.destroy();
    }
  } catch (error) {
    throw error;
  }
};

export default {
  createNewUser,
  getAllUsers,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
