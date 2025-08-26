import express, { Application } from "express";

const viewEngine = (app: Application): void => {
  // Cấu hình view engine EJS
  app.set("view engine", "ejs");
  app.set("views", "./src/views");

  // Cấu hình static files
  app.use(express.static("./src/public"));
};

export default viewEngine;
