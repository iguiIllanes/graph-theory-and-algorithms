import React from "react";

const FourButtonsWithInput = () => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h2>Four Buttons with Input and Radio Buttons</h2>
      <div>
        <h3>Button 1</h3>
        <button>Button 1</button>
      </div>
      <div>
        <h3>Button 2</h3>
        <button>Button 2</button>
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

export default FourButtonsWithInput;
