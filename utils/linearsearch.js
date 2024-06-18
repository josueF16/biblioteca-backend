// utils/linearsearch.js

/**
 * Implementación del algoritmo de búsqueda lineal para encontrar un objeto en un array por una clave y un valor específicos.
 *
 *  arr - El array en el cual buscar.
 * key - La clave del objeto por la cual buscar.
 *  value - El valor de la clave por la cual buscar.
 * retorna el objeto encontrado o null si no se encuentra.
 */
function linearSearch(arr, key, value) {
  // Itera sobre cada elemento del array.
  for (let i = 0; i < arr.length; i++) {
    // Si el valor del elemento coincide con el valor buscado, devuelve el elemento.
    if (arr[i][key] === value) {
      return arr[i];
    }
  }

  // Si no se encuentra el elemento, devuelve null.
  return null;
}

module.exports = linearSearch;
