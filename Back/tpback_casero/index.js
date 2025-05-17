const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const {
  HTTP_STATUS,
  HTTP_MESSAGES,
} = require("./src/constants/http.constants");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");

// Rutas
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Importar rutas
const userRoutes = require("./src/routes/user.routes");

// Definir rutas base
app.use("/users", userRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(HTTP_STATUS.NOT_FOUND).render("error", {
    status: HTTP_STATUS.NOT_FOUND,
    message: HTTP_MESSAGES[HTTP_STATUS.NOT_FOUND],
    error: null,
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  res.status(statusCode).render("error", {
    status: statusCode,
    message: err.message || HTTP_MESSAGES[statusCode],
    error: err,
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
