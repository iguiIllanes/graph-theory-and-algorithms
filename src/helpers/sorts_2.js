export function generarListaAleatoria() {
   var lista = [];
   for (var i = 0; i < 200; i++) {
     lista.push(Math.floor(Math.random() * 1000));
   }
   return lista;
 }


 export function mergeSort(arr) {
   if (arr.length <= 1) {
     return arr;
   }
 
   const mid = Math.floor(arr.length / 2);
   const left = arr.slice(0, mid);
   const right = arr.slice(mid);
 
   return merge(mergeSort(left), mergeSort(right));
 }
 
 function merge(left, right) {
   const result = [];
 
   while (left.length && right.length) {
     if (left[0] <= right[0]) {
       result.push(left.shift());
     } else {
       result.push(right.shift());
     }
   }
 
   return result.concat(left, right);
 }
 
 export function shellSort(arr) {
   const n = arr.length;
   let gap = Math.floor(n / 2);
 
   while (gap > 0) {
     for (let i = gap; i < n; i++) {
       const temp = arr[i];
       let j = i;
 
       while (j >= gap && arr[j - gap] > temp) {
         arr[j] = arr[j - gap];
         j -= gap;
       }
 
       arr[j] = temp;
     }
 
     gap = Math.floor(gap / 2);
   }
 
   return arr;
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
   for (let i = 0; i < arr.length - 1; i++) {
     let minIndex = i;
 
     for (let j = i + 1; j < arr.length; j++) {
       if (arr[j] < arr[minIndex]) {
         minIndex = j;
       }
     }
 
     if (minIndex !== i) {
       const temp = arr[i];
       arr[i] = arr[minIndex];
       arr[minIndex] = temp;
     }
   }
 
   return arr;
 }
 