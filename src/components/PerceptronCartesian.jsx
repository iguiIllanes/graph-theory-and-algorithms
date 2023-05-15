import React from "react";
import PropTypes from 'prop-types';

function PerceptronCartesian({ x1, y1, x2, y2 }) {
  
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  const maxX = Math.max(x1, x2);
  const maxY = Math.max(y1, y2);

  const width = maxX - minX + 40;
  const height = maxY - minY + 40;

  const xScale = (val) => ((val - minX) / (maxX - minX)) * (width - 40);
  const yScale = (val) => height - ((val - minY) / (maxY - minY)) * (height - 40);

  const path = `M ${xScale(x1)} ${yScale(y1)} L ${xScale(x2)} ${yScale(y2)}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ border: "1px solid black" }}>
      <line x1={xScale(minX)} y1={yScale(0)} x2={xScale(maxX)} y2={yScale(0)} stroke="black" />
      <line x1={xScale(0)} y1={yScale(minY)} x2={xScale(0)} y2={yScale(maxY)} stroke="black" />
      <path d={path} stroke="red" strokeWidth="2" />
    </svg>
  );
}
   PerceptronCartesian.propTypes = {
   x1: PropTypes.number.isRequired,
   y1: PropTypes.number.isRequired,
   x2: PropTypes.number.isRequired,
   y2: PropTypes.number.isRequired,
 };
export default PerceptronCartesian;
