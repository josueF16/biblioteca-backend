const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["admin", "usuario"], default: "usuario" },
});

const UsuarioModel = mongoose.model("Usuario", usuarioSchema, "usuarios");

module.exports = UsuarioModel;
