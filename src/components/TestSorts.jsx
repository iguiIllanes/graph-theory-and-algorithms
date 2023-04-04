import React, { useState } from "react";
import { generarListaAleatoria, insertionSort, selectionSort, mergeSort, shellSort } from "../helpers/sorts_2";
import { generateRandomArray,arrayToString} from "../algorithms/sorts";
import "../styles/Sorts.css";
const TestSort = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [array, setArray] = useState([]);
  const [isRandom, setIsRandom] = React.useState(false);
  const [text, setText] = useState("");
   const [readOnly, setReadOnly] = useState(false);
   const [Disabled, setDisabled] = useState(false);
  
   const handleTextChange = (e) => {
    setText(e.target.value);
    const arrayFromText = e.target.value.split(",").map(Number); // Convertir texto a arreglo
    setArray(arrayFromText);
    console.log(array)
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleClear = () => {
    setText("");
    setArray([]);
    setReadOnly(false);
    setIsRandom(false);
    setDisabled(false);
  };

  const handleRandomArray = () => {
    let n = prompt("Cuántos elementos ingresará?");
    const randomArray = generateRandomArray(n);
    console.log("Arreglo aleatorio",randomArray);
    setIsRandom(true);
    setArray(randomArray);
    setText(arrayToString(randomArray));
    setReadOnly(true);
    setDisabled(true);
  };
const handleInsertionSort = () => {
      const sortedArray = insertionSort(array);
      console.log("Arreglo ordenado - Insertion", sortedArray.sortedArray);
      console.log("Operaciones - Insertion", sortedArray.numOperations);
      console.log("Runtime - Insertion", sortedArray.runtime);
      };

  const handleRandomArray = () => {
    const randomArray = generarListaAleatoria();
    setArray(randomArray);

    console.log("Arreglo aleatorio", randomArray);
  };

  const handleInsertionSort = () => {
    const sortedArrayObject = insertionSort(array);
    console.log("Arreglo ordenado - Insertion", sortedArrayObject.sortedArray);
    console.log("Operaciones - Insertion", sortedArrayObject.numOperations);
    console.log("Runtime - Insertion", sortedArrayObject.runtime);
  };

  const handleSelectionSort = () => {
    const sortedArray = selectionSort(array);
    console.log("Arreglo ordenado - Selection", sortedArray.sortedArray);
    console.log("Operaciones - Selection", sortedArray.numOperations);
    console.log("Runtime - Selection", sortedArray.runtime);
  };

  const handleShellSort = () => {
    const sortedArray = shellSort(array);
    console.log("Arreglo ordenado - Shell", sortedArray.sortedArray);
    console.log("Operaciones - Shell", sortedArray.numOperations);
    console.log("Runtime - Shell", sortedArray.runtime);
  };

  const handleMergeSort = () => {
    const sortedArray = mergeSort(array);
    console.log("Arreglo ordenado - Merge", sortedArray.sortedArray);
    console.log("Operaciones - Merge", sortedArray.numSteps);
    console.log("Runtime - Merge", sortedArray.runtime);
  };

  return (
    <div>
      <h2>Algoritmos de Ordenamiento</h2>

      <div>

        <textarea
          rows="1"
          value={isRandom ? array : text}
          onChange={handleTextChange}
          style={{ height: "auto", overflow: "hidden" }}
          disabled={readOnly}
        />
      </div>
      <div className="row-intial">
        <button className="buttonSort" onClick={handleRandomArray} disabled={Disabled}>Random</button>
        <button className="buttonSort" onClick={handleClear}>Clear</button>
      </div>

      <div className="row">
        <button onClick={handleInsertionSort}>Insertion Sort</button>
        <button onClick={handleSelectionSort}>Selection Sort</button>
      </div>
      <div>
        
      </div>
      <div className="row">
        <button onClick={handleShellSort}>Shell Sort</button>
        <button onClick={handleMergeSort}>Merge Sort</button>
      </div>
      <div>
        
      </div>

      
    </div>
  );
};

export default TestSort;
