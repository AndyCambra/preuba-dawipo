#!/usr/bin/env node

import app from "../src/app";
import { conn } from "../src/db";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await conn.sync({ alter: true });
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Database sync failed:", error);
    return;
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

startServer();
