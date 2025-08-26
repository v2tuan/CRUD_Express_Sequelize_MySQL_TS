import express, { Application } from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/configdb";

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view engine và routes
viewEngine(app);
initWebRoutes(app);

// Kết nối database
connectDB();

// Cổng chạy server
const PORT: number = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
