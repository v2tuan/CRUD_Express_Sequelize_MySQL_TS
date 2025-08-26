import express, { Application, Request, Response } from "express";
import homeControllers from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app: Application): Application => {
  router.get("/", (req: Request, res: Response) => {
    return res.send("Võ Văn Tuấn");
  });

  router.get("/home", homeControllers.getHomePage);
  router.get("/about", homeControllers.getAboutPage);
  router.get("/crud", homeControllers.getCRUD);
  router.get("/post-crud", homeControllers.postCRUD);
  router.get("/get-crud", homeControllers.getFindAllCRUD);
  router.get("/edit-crud", homeControllers.getEditCRUD);
  router.post("/put-crud", homeControllers.putCRUD);
  router.get("/delete-crud", homeControllers.deleteCRUD);

  app.use("/", router);
  return app;
};

export default initWebRoutes;
