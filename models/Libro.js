const mongoose = require("mongoose");

const libroSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  urlImagen: String,
});

const LibroModel = mongoose.model("Libro", libroSchema, "libros");

module.exports = LibroModel;
