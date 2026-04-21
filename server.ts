import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const APPOINTMENTS_FILE = path.join(process.cwd(), "appointments.json");

async function initFile() {
  try {
    await fs.access(APPOINTMENTS_FILE);
  } catch {
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify([]));
  }
}

async function startServer() {
  await initFile();

  app.use(express.json());

  // API Routes
  app.post("/api/book-appointment", async (req, res) => {
    const { name, phone, email, testType, date } = req.body;

    if (!name || !phone || !email || !testType || !date) {
      return res.status(400).json({ status: "Failed", message: "Missing required fields" });
    }

    try {
      const data = await fs.readFile(APPOINTMENTS_FILE, "utf-8");
      const appointments = JSON.parse(data);
      
      const newAppointment = {
        id: Date.now().toString(),
        name,
        phone,
        email,
        testType,
        date,
        createdAt: new Date().toISOString()
      };

      appointments.push(newAppointment);
      await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));

      // Notification logic removed as it's now handled client-side via WhatsApp redirect
      res.status(200).json({ status: "Sent", message: "Appointment saved successfully" });
    } catch (error) {
      console.error("Error saving appointment:", error);
      res.status(500).json({ status: "Failed", message: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
