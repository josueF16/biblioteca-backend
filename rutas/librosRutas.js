const express = require("express");
const router = express.Router();
const LibroModel = require("../models/Libro");
const authMiddleware = require("../middleware/authMiddleware");

const quickSort = require("../utils/quicksort");
const bubbleSort = require("../utils/bubblesort");
const mergeSort = require("../utils/mergesort");
const linearSearch = require("../utils/linearsearch");

// Obtener todos los libros ordenados por un campo especificado
router.get("/libros", authMiddleware, async (req, res) => {
  const { sortField = "titulo", algorithm = "quick" } = req.query;

  try {
    let libros = await LibroModel.find();

    switch (algorithm) {
      case "quick":
        libros = quickSort(libros, sortField);
        break;
      case "bubble":
        libros = bubbleSort(libros, sortField);
        break;
      case "merge":
        libros = mergeSort(libros, sortField);
        break;
      default:
        libros = quickSort(libros, sortField);
    }

    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Buscar un libro por un campo específico y su valor
router.get("/libros/buscar", authMiddleware, async (req, res) => {
  const { key, value } = req.query;

  try {
    let libros = await LibroModel.find();
    const libro = linearSearch(libros, key, value);

    if (libro) {
      res.json(libro);
    } else {
      res.status(404).json({ mensaje: "Libro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Crear un nuevo libro
router.post("/libros/crear", authMiddleware, async (req, res) => {
  const { codigo, titulo, autor, urlImagen } = req.body;

  try {
    const nuevoLibro = new LibroModel({ codigo, titulo, autor, urlImagen });
    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Editar un libro
router.put("/libros/editar/:id", authMiddleware, async (req, res) => {
  try {
    const libroEditado = await LibroModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!libroEditado)
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    else return res.status(200).json(libroEditado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar un libro
router.delete("/libros/eliminar/:id", authMiddleware, async (req, res) => {
  try {
    const libroEliminado = await LibroModel.findByIdAndDelete(req.params.id);
    if (!libroEliminado)
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    else return res.json({ mensaje: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Obtener un libro por su ID
router.get("/libros/:id", authMiddleware, async (req, res) => {
  try {
    const libro = await LibroModel.findById(req.params.id);
    if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });
    else return res.json(libro);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Contar el número total de libros
router.get("/libros/total", authMiddleware, async (req, res) => {
  try {
    const total = await LibroModel.countDocuments();
    return res.json({ totalLibros: total });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
