import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use(cors());
app.use("/api", routes);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(` Cats Backend is running on http://localhost:${PORT}`);
});
