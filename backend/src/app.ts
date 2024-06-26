import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express"; // Importa tipos de TypeScript
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  // Tipado de parámetros
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Tipado de parámetros
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});

export default app; // Exporta usando `export default`
