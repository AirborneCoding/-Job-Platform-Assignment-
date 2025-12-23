import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { connectDB } from "./db/connect";

import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

const app = express();
app.use(cors());

import positionsRouter from "./routes/positions.routes";
import applicationsRouter from "./routes/applications.routes";

import { runMigrations } from "./db/migrate";
import { seedPositions } from "./db/seeds";

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.send(
    "<h1>Senior developer task for Markoub.ma</h1><p>API + PostgreSQL + Drizzle ORM ready!</p>"
  );
});
app.use("/api/v1/positions", positionsRouter);
app.use("/api/v1/applications", applicationsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

connectDB.connect(async (err) => {
  if (err) {
    console.error("pg connection error: ", err);
  } else {
    console.log("pg connected...");
    await runMigrations();
    await seedPositions();
  }

  startServer();
});
