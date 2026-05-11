import express from "express";
const PORT = 3000;
const APP = express();

APP.use(express.json());
async function startServer() {
  try {
    APP.listen(PORT, () => {
      console.log("server running");
    });
  } catch (error) {
    console.error(":(", error);
    process.exit(1);
  }
}

startServer();
