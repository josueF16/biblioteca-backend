const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const UsuarioModel = require("../models/Usuario");

const rutas = express.Router();

// Registro de usuario
rutas.post(
  "/register",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("email", "Por favor incluye un email válido").isEmail(),
    check("password", "La contraseña debe tener 6 o más caracteres").isLength({
      min: 6,
    }),
    check("rol", "El rol es requerido y debe ser 'admin' o 'usuario'").isIn([
      "admin",
      "usuario",
    ]),
  ],
  async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { nombre, email, password, rol } = req.body;

    try {
      let usuario = await UsuarioModel.findOne({ email });
      if (usuario) {
        return res.status(400).json({ mensaje: "El usuario ya existe" });
      }

      usuario = new UsuarioModel({
        nombre,
        email,
        password,
        rol,
      });

      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);

      await usuario.save();

      const payload = {
        usuario: {
          id: usuario.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, rol: usuario.rol });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error en el servidor");
    }
  }
);

// Inicio de sesión de usuario
rutas.post(
  "/login",
  [
    check("email", "Por favor incluye un email válido").isEmail(),
    check("password", "La contraseña es requerida").exists(),
  ],
  async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    try {
      let usuario = await UsuarioModel.findOne({ email });
      if (!usuario) {
        return res.status(400).json({ mensaje: "Credenciales inválidas" });
      }

      const esCoincidente = await bcrypt.compare(password, usuario.password);
      if (!esCoincidente) {
        return res.status(400).json({ mensaje: "Credenciales inválidas" });
      }

      const payload = {
        usuario: {
          id: usuario.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, rol: usuario.rol });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error en el servidor");
    }
  }
);

rutas.post("/logout", (req, res) => {
  res.json({ mensaje: "Sesión cerrada exitosamente" });
});

module.exports = rutas;
