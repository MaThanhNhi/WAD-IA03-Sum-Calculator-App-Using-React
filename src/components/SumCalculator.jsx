import { useState } from 'react';
import { bigDecimal } from 'js-big-decimal';


function SumCalculator() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [sum, setSum] = useState(null);
  const [error, setError] = useState('');

  // Helper function to remove trailing zeros
  const formatNumber = (numberString) => {
    const num = parseFloat(numberString);
    return num.toString();
  };

  const handleNumber1Change = (e) => {
    setNumber1(e.target.value);
    setSum(null);
    setError('');
  };

  const handleNumber2Change = (e) => {
    setNumber2(e.target.value);
    setSum(null);
    setError('');
  };

  const calculateSum = () => {
    setError('');
    setSum(null);

    if (number1.trim() === '' || number2.trim() === '') {
      setError('Please enter both numbers');
      return;
    }

    const validNumberRegex = /^-?(\d+\.?\d*|\.\d+)$/;

    if (!validNumberRegex.test(number1.trim())) {
      setError('Number 1 is not a valid number');
      return;
    }

    if (!validNumberRegex.test(number2.trim())) {
      setError('Number 2 is not a valid number');
      return;
    }    
    
    try {
      const num1 = bigDecimal.round(number1.trim(), 10);
      const num2 = bigDecimal.round(number2.trim(), 10);
      
      const result = bigDecimal.add(num1, num2);
      
      const resultValue = parseFloat(result);
      if (!isFinite(resultValue)) {
        setError('Result is not a finite number');
        return;
      }

      const formattedResult = formatNumber(result);
      setSum(formattedResult);
    } catch (error) {
      setError('Error calculating sum: Invalid number format');
      console.error(error);
    }
  };

  //Handle Enter key press to calculate
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      calculateSum();
    }
  };

  return (
    <div className="app-container">
      <div className="calculator-container">
        <h1>Sum Calculator</h1>
        
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="number1">Number 1:</label>
            <input
              type="text"
              id="number1"
              value={number1}
              onChange={handleNumber1Change}
              onKeyDown={handleKeyPress}
              placeholder="Enter first number"
              className="number-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="number2">Number 2:</label>
            <input
              type="text"
              id="number2"
              value={number2}
              onChange={handleNumber2Change}
              onKeyDown={handleKeyPress}
              placeholder="Enter second number"
              className="number-input"
            />
          </div>

          <button onClick={calculateSum} className="calculate-btn">
            Calculate Sum
          </button>
        </div>
      </div>

      <div className="result-section">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span> {error}
          </div>
        )}

        {!error && (
          <div className="result-display">
            <h2>Result: {sum}</h2>
          </div>
        )}
      </div>
    </div>
  );
}



export default SumCalculator;
