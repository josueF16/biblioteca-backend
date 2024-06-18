const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors"); // Importar el paquete cors
const app = express();

const libroRutas = require("./rutas/librosRutas");
const authRutas = require("./rutas/authRutas");
const authMiddleware = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URL;

// Configurar CORS
const corsOptions = {
  origin: "*", // Origen permitido, puedes cambiarlo según tu configuración de React
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};

app.use(cors(corsOptions)); // Usar cors con las opciones configuradas

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conexion exitosa");
    app.listen(PORT, () => {
      console.log("Servidor express corriendo en el puerto: " + PORT);
    });
  })
  .catch((error) => console.log("error de conexion", error));

app.use("/api/v1", libroRutas);

app.use("/auth", authRutas);
