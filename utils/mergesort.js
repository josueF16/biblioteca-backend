// utils/mergesort.js

/**
 * Función merge para combinar dos arrays ordenados en un solo array ordenado.
 *
 *  left - El sub-array izquierdo ordenado.
 *  right - El sub-array derecho ordenado.
 *  key - La clave del objeto por la cual se va a ordenar.
 * retorna el array combinado y ordenado.
 */
function merge(left, right, key) {
  let result = [];

  // Mientras ambos sub-arrays tengan elementos, comparar los primeros elementos y añadir el menor al resultado.
  while (left.length && right.length) {
    if (left[0][key] < right[0][key]) {
      result.push(left.shift()); // Elimina el primer elemento del sub-array izquierdo y añádelo al resultado.
    } else {
      result.push(right.shift()); // Elimina el primer elemento del sub-array derecho y añádelo al resultado.
    }
  }

  // Concatena cualquier elemento restante de los sub-arrays izquierdo y derecho al resultado.
  return result.concat(left, right);
}

/**
 * Implementación del algoritmo Merge Sort para ordenar un array de objetos por una clave específica.
 *
 *  arr - El array a ordenar.
 *  key - La clave del objeto por la cual se va a ordenar.
 * retorna el array ordenado.
 */
function mergeSort(arr, key) {
  // Caso base: arrays con 0 o 1 elementos ya están ordenados.
  if (arr.length <= 1) return arr;

  // Divide el array en dos mitades.
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid), key); // Ordena recursivamente la mitad izquierda.
  let right = mergeSort(arr.slice(mid), key); // Ordena recursivamente la mitad derecha.

  // Combina las dos mitades ordenadas.
  return merge(left, right, key);
}

module.exports = mergeSort;
