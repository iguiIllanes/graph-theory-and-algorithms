export function generarListaAleatoria(n) {
   var lista = [];
   for (var i = 0; i < n; i++) {
     lista.push(Math.floor(Math.random() * 100450));
   }
   return lista;
 }


 export function mergeSort(arr) {
  let numSteps = 0;

  function merge(left, right) {
    const result = [];
    let il = 0;
    let ir = 0;

    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
      numSteps++;
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
  }

  function mergeSortHelper(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSortHelper(left), mergeSortHelper(right));
  }

  const t0 = performance.now();
  const sortedArray = mergeSortHelper(arr);
  const t1 = performance.now();

  return {sortedArray, numSteps, runtime: t1 - t0};
}



 export function shellSort(arr) {
  const n = arr.length;
  let gap = Math.floor(n / 2);
  let contador = 0;

  const start = performance.now();

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
        contador++;
      }

      arr[j] = temp;
    }

    gap = Math.floor(gap / 2);
  }

  const end = performance.now();
  const runtime = end - start;


  return {
    sortedArray: arr,
    numOperations: contador,
    runtime: runtime
  };
}

 
//  export function insertionSort(arr) {
//    for (let i = 1; i < arr.length; i++) {
//      const key = arr[i];
//      let j = i - 1;
 
//      while (j >= 0 && arr[j] > key) {
//        arr[j + 1] = arr[j];
//        j--;
//      }
 
//      arr[j + 1] = key;
//    }
 
//    return arr;
//  }
export function insertionSort(arr) {
   let contador = 0;
   const start = performance.now();
 
   for (let i = 1; i < arr.length; i++) {
     const key = arr[i];
     let j = i - 1;
 
     while (j >= 0 && arr[j] > key) {
       arr[j + 1] = arr[j];
       j--;
       contador++; // incrementar el contador por cada comparación realizada
     }
 
     arr[j + 1] = key;
   }
 
   const end = performance.now();
   const runtime = end - start;
 
  
 
   return {
     sortedArray: arr,
     numOperations: contador,
     runtime: runtime,
   };
 }
 
 
 
 export function selectionSort(arr) {
  let contador = 0;
  const start = performance.now();
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      contador++;
    }

    if (minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  const end = performance.now();
  const runtime = end - start;

  //console.log(`Número de operaciones: ${contador}`);

  return {
    sortedArray: arr,
    numOperations: contador,
    runtime: runtime,
}};

 