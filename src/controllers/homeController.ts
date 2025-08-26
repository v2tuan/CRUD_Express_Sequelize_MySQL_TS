import { Request, Response } from "express";
import db from "../models/index";
import CRUDService from "../services/CRUDService";

// Trang chủ
const getHomePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await CRUDService.getAllUsers();
    console.log("----------------------------------------");
    console.log(data);
    console.log("----------------------------------------");
    res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error fetching home page data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// About
const getAboutPage = (req: Request, res: Response): void => {
  res.render("test/about.ejs");
};

// CRUD Page
const getCRUD = (req: Request, res: Response): void => {
  res.render("crud.ejs");
};

// Find all users
const getFindAllCRUD = async (req: Request, res: Response): Promise<void> => {
  const data = await CRUDService.getAllUsers();
  res.render("users/findAllUser.ejs", {
    data: JSON.stringify(data),
  });
};

// Create user
const postCRUD = async (req: Request, res: Response): Promise<void> => {
  const message = await CRUDService.createNewUser(req.body);
  console.log(message);
  res.send("Post CRUD from server");
};

// Edit user
const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
  const userId = req.query.id as string;
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId);
    res.render("users/editUser.ejs", {
      user: userData,
    });
    return;
  }
  res.send("User not found");
};

// Update user
const putCRUD = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;
  const dataUpdate = await CRUDService.updateUserData(data);
  res.render("users/findAllUser.ejs", {
    user: dataUpdate,
  });
};

// Delete user
const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
  const userId = req.query.id as string;
  if (userId) {
    await CRUDService.deleteUserById(userId);
    res.send("Delete user success");
    return;
  }
  res.send("User not found");
};

export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  getFindAllCRUD,
  postCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
