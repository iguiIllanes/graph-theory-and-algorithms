import React, { useState } from "react";
import { generarListaAleatoria, insertionSort, selectionSort, mergeSort, shellSort } from "../helpers/sorts_2";
import { generateRandomArray,arrayToString} from "../algorithms/sorts";
const TestSort = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [array, setArray] = useState([]);
  const [isRandom, setIsRandom] = React.useState(false);
  const [text, setText] = useState("");
   const [readOnly, setReadOnly] = useState(false);
  
  const handleTextChange = (e) => {
    setText(e.target.value);
    
    setArray(text);
    console.log(array)
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleRandomArray = () => {
      // var randomArray = generarListaAleatoria();
      // setArray(randomArray);
      // console.log("Arreglo aleatorio",randomArray);
      
      let n = prompt("Cuántos elementos ingresará?");


      const randomArray = generateRandomArray(n);
      console.log("Arreglo aleatorio",randomArray);
      setIsRandom(!isRandom);
      const randomString = arrayToString(randomArray);
      const randomArrayFromString = randomString.split('|');
      setArray(randomArrayFromString);
      setReadOnly(true);
      
      
   }
const handleInsertionSort = () => {
      const sortedArray = insertionSort(array);
      console.log("Arreglo ordenado - Insertion", sortedArray.sortedArray);
      console.log("Operaciones - Insertion", sortedArray.numOperations);
      console.log("Runtime - Insertion", sortedArray.runtime);
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
        <h3>Input Field</h3>
        <input type="text" placeholder={isRandom ? array : ''}/>
      </div>
      <div>
        <button onClick={handleRandomArray}>Random</button>
      </div>
      <div>
        <button onClick={handleInsertionSort}>Insertion Sort</button>
      </div>
      <div>
        <button onClick={handleSelectionSort}>Selection Sort</button>
      </div>
      <div>
        <button onClick={handleShellSort}>Shell Sort</button>
      </div>
      <div>
        <button onClick={handleMergeSort}>Merge Sort</button>
      </div>

      <div>
        <h3>Radio Buttons</h3>
        <label>
          Option 1:
          <input
            type="radio"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={handleOptionChange}
          />
        </label>
        <label>
          Option 2:
          <input
            type="radio"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleOptionChange}
          />
        </label>
      </div>
    </div>
  );
  };

export default TestSort;   
