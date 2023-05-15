import React from 'react';
import PropTypes from 'prop-types';

const PerceptronResults = ({lastWeights},{iterations}) => {
   return (
      <div>
      <h2>Resultados del Perceptrón</h2>
      <p>Últimos pesos sinápticos:</p>
      <p>{`W1: ${lastWeights[0]}, W2: ${lastWeights[1]}`}</p>
      <p>Número de iteraciones: {iterations}</p>
    </div>
  )
}
PerceptronResults.propTypes = {
   lastWeights: PropTypes.arrayOf(PropTypes.number).isRequired,
   iterations: PropTypes.number.isRequired,}

export default PerceptronResults;