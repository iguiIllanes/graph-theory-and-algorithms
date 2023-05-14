export function perceptron(inputs, weights, expected, threshold, learningRate) {
    let iterations = 0;
    let error = true;
    
    while (error) {
      error = false;
      
      for (let i = 0; i < inputs.length; i++) {
        const result = dotProduct(inputs[i], weights) > threshold ? 1 : 0;
        const delta = expected[i] - result;
        
        if (delta !== 0) {
          error = true;
          iterations++;
          updateWeights(inputs[i], weights, delta, learningRate);
        }
      }
    }
    
    const xCoord = -threshold / weights[0];
    const yCoord = -threshold / weights[1];
    
    return {
      x: xCoord,
      y: yCoord,
      iterations: iterations
    }
  }
  
  function dotProduct(inputs, weights) {
    let result = 0;
    
    for (let i = 0; i < inputs.length; i++) {
      result += inputs[i] * weights[i];
    }
    
    return result;
  }
  
    function updateWeights(inputs, weights, delta, learningRate) {
    for (let i = 0; i < inputs.length; i++) {
      weights[i] += delta * learningRate * inputs[i];
    }
  }
  