import React from "react";
import CustomComponentNode from "./../utils/CustomComponentNode";

const CustomTEST = () => {
  return (
    <CustomComponentNode>
      <label htmlFor="text">Añadir Número:</label>
      <input type="text" id="text" name="text" />
      <button type="button">Añadir</button>
    </CustomComponentNode>
  );
};

export default CustomTEST;
