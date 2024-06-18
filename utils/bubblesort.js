// utils/bubblesort.js

/**
 * Implementación del algoritmo Bubble Sort para ordenar un array de objetos por una clave específica.
 *
 *  arr - El array a ordenar.
 *  key - La clave del objeto por la cual se va a ordenar.
 * retorna el array ordenado.
 */
function bubbleSort(arr, key) {
  let len = arr.length;

  // Bucle exterior: itera sobre todo el array.
  for (let i = 0; i < len; i++) {
    // Bucle interior: itera desde el inicio del array hasta el último elemento no ordenado.
    for (let j = 0; j < len - i - 1; j++) {
      // Si el elemento actual es mayor que el siguiente elemento, intercambiarlos.
      if (arr[j][key] > arr[j + 1][key]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  // Devuelve el array ordenado.
  return arr;
}

module.exports = bubbleSort;
