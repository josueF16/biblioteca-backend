const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ mensaje: "No hay token, permiso no válido" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "No hay token, permiso no válido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token no es válido" });
  }
};

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("x-auth-token");

//   if (!token) {
//     return res.status(401).json({ mensaje: "No hay token, permiso no válido" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.usuario = decoded.usuario;
//     next();
//   } catch (error) {
//     res.status(401).json({ mensaje: "Token no es válido" });
//   }
// };
