/**
 * Implementación del algoritmo Quicksort para ordenar un array de objetos por una clave específica.
 *
 *  arr => El array a ordenar.
 *  key => La clave del objeto por la cual se va a ordenar.
 * retorna el array ordenado
 */
function quickSort(arr, key) {
  // Caso base: arrays con 0 o 1 elementos ya están ordenados.
  if (arr.length <= 1) return arr;

  // Selecciona un elemento pivote del medio del array.
  let pivot = arr[Math.floor(arr.length / 2)][key];

  // Crea tres sub-arrays:
  // left: elementos menores que el pivote
  // middle: elementos iguales al pivote
  // right: elementos mayores que el pivote
  let left = arr.filter((item) => item[key] < pivot);
  let middle = arr.filter((item) => item[key] === pivot);
  let right = arr.filter((item) => item[key] > pivot);

  // Ordena recursivamente los sub-arrays izquierdo y derecho y concatenalos con el sub-array medio.
  return [...quickSort(left, key), ...middle, ...quickSort(right, key)];
}

module.exports = quickSort;
