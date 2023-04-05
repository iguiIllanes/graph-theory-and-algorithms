import React, { useState } from "react";
import {  insertionSort, selectionSort, mergeSort, shellSort } from "../helpers/sorts_2";
import { generateRandomArray,arrayToString} from "../algorithms/sorts";
import "../styles/Sorts.css";
import Modal from "./Modal";
import ArrayCuadraditos from "./ArrayGraph";
const TestSort = () => {
  const [algorithm, setAlgorithm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [isRandom, setIsRandom] = React.useState(false);
  const [text, setText] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const [Disabled, setDisabled] = useState(false);
  const [operations, setOperations] = useState(0);
  const [runtime, setRuntime] = useState(0);

  

    const handleShowModal = () => {
      setShowModal(false);
   
  };

  
   const handleTextChange = (e) => {
    setText(e.target.value);
    const arrayFromText = e.target.value.split(",").map(Number); // Convertir texto a arreglo
    setArray(arrayFromText);
    console.log(array)
  };

  

  const handleClear = () => {
    setText("");
    setArray([]);
    setSortedArray([]);
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
    setDisabled(true);
  };
  const handleInsertionSort = () => {
    const copyArrayAux = [...array]; // Copiar el arreglo desordenado en un nuevo arreglo
    const sortedArrayAux = insertionSort(copyArrayAux);
    setSortedArray([...sortedArrayAux.sortedArray]); // Copiar el arreglo ordenado en un nuevo arreglo
    console.log("Arreglo ordenado - Insertion", sortedArrayAux.sortedArray);
    console.log("Operaciones - Insertion", sortedArray.numOperations);
    console.log("Runtime - Insertion", sortedArray.runtime);
    setOperations(sortedArrayAux.numOperations);
    setRuntime(sortedArrayAux.runtime);
    setAlgorithm("Insertion Sort");
    setShowModal(!showModal);
  };
  
  const handleSelectionSort = () => {
    const copyArrayAux = [...array]; // Copiar el arreglo desordenado en un nuevo arreglo

    const sortedArrayAux = selectionSort(copyArrayAux);
    // Copiar el arreglo ordenado en un nuevo arreglo
    console.log("Arreglo ordenado - Selection", sortedArrayAux.sortedArray);
    console.log("Operaciones - Selection", sortedArrayAux.numOperations);
    console.log("Runtime - Selection", sortedArrayAux.runtime);
    setShowModal(!showModal);
    setSortedArray([...sortedArrayAux.sortedArray]);
    setOperations(sortedArrayAux.numOperations);
    setRuntime(sortedArrayAux.runtime);
    setAlgorithm("Selection Sort");

  };

  const handleShellSort = () => {
    const copyArrayAux = [...array]; // Copiar el arreglo desordenado en un nuevo arreglo
    const sortedArrayAux = shellSort(copyArrayAux);
    console.log("Arreglo ordenado - Shell", sortedArrayAux.sortedArray);
    console.log("Operaciones - Shell", sortedArrayAux.numOperations);
    console.log("Runtime - Shell", sortedArrayAux.runtime);
    setShowModal(!showModal);
    setSortedArray([...sortedArrayAux.sortedArray]);
    setOperations(sortedArrayAux.numOperations);
    setRuntime(sortedArrayAux.runtime);
    setAlgorithm("Shell Sort");
  };

  const handleMergeSort = () => {
    const copyArrayAux = [...array]; // Copiar el arreglo desordenado en un nuevo arreglo
    const sortedArrayAux = mergeSort(copyArrayAux);
    console.log("Arreglo ordenado - Merge", sortedArrayAux.sortedArray);
    console.log("Operaciones - Merge", sortedArrayAux.numSteps);
    console.log("Runtime - Merge", sortedArrayAux.runtime);
    setShowModal(!showModal);
    setSortedArray([...sortedArrayAux.sortedArray]);
    setOperations(sortedArrayAux.numSteps);
    setRuntime(sortedArrayAux.runtime);
    setAlgorithm("Merge Sort");
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
    
      <div className="row">
        <button onClick={handleShellSort}>Shell Sort</button>
        <button onClick={handleMergeSort}>Merge Sort</button>
      </div>
      
      
        {showModal ? (
          <div>
          <Modal content={<ArrayCuadraditos array={array} sortedArray={sortedArray} algorithm={algorithm} 
          operations={operations} runtime={runtime}/>}
            show={showModal} onClose={handleShowModal} >
          </Modal>
        </div>
        ) : 
        (<></>
        )}


      
        
     

      
    </div>
  );
  };

export default TestSort;   
