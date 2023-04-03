import React from "react";
import { useState } from "react";
import { generarListaAleatoria, insertionSort } from "../helpers/sorts_2";

const TestSort = () => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [array, setArray] = useState([]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleRandomArray = () => {
      var randomArray = generarListaAleatoria();
      setArray(randomArray);
      
      console.log("Arreglo aleatorio",randomArray);
   }
const handleInsertionSort = () => {

      let sortedArrayObject = insertionSort(array);
      console.log("Arreglo ordenado - Insertion",sortedArrayObject.sortedArray);
      console.log("Operaciones - Insertion",sortedArrayObject.numOperations);
      console.log("Runtime - Insertion",sortedArrayObject.runtime);
}
const handleSelectionSort = () => {
      let sortedArray = selectionSort(array);
      console.log("Arreglo ordenado - Selection",sortedArray);
}

  return (
    <div>
      <h2>Algoritmos de Ordenamiento</h2>
      <div>
        <button onClick={handleRandomArray} >Random</button>
      </div>
      <div>
        <button onClick={handleInsertionSort}>Insertion Sort</button>
      </div>
      <div>
        <h3>Button 3</h3>
        <button>Button 3</button>
      </div>
      <div>
        <h3>Button 4</h3>
        <button>Button 4</button>
      </div>
      <div>
        <h3>Input Field</h3>
        <input type="text" placeholder="Enter text here" />
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
