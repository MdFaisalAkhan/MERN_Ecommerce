const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling Uncaught Error
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config

dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 9000;

//connect DB--
connectDatabase();

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}!`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Sitting down the erver due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
