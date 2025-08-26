import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";

// Xác định environment (dev/prod/test)
const env: string = process.env.NODE_ENV || "development";

// Đọc file config.json
const configPath = path.resolve(__dirname, "../config/config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"))[env];

// Khởi tạo Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host || "localhost",
    dialect: config.dialect || "mysql",
    logging: false, // Tắt log SQL
  }
);

// Hàm kết nối
export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

// Export sequelize để dùng cho model
export default connectDB;
