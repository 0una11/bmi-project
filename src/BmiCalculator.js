// BmiCalculator.js
import React, { useState } from 'react';
import './BmiCalculator.css';

const BmiCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [advice, setAdvice] = useState('');
  const [history, setHistory] = useState([]); // 用於儲存歷史記錄

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Please enter both weight and height!');
      return;
    }

    // 動態範圍校正
    if (weight <= 0 || weight > 300) {
      alert('Please enter a valid weight (1-300 kg)');
      return;
    }

    if (height <= 0 || height > 250) {
      alert('Please enter a valid height (1-250 cm)');
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    let bmiStatus = '';
    let bmiAdvice = '';
    if (bmiValue < 18.5) {
      bmiStatus = 'Underweight';
      bmiAdvice = 'Consider a nutrient-rich diet and consult a dietitian if necessary.';
    } else if (bmiValue < 24.9) {
      bmiStatus = 'Normal weight';
      bmiAdvice = 'Keep up the good work with balanced diet and regular exercise!';
    } else if (bmiValue < 29.9) {
      bmiStatus = 'Overweight';
      bmiAdvice = 'Consider a balanced diet and increase physical activity.';
    } else {
      bmiStatus = 'Obesity';
      bmiAdvice = 'Consult with a healthcare provider for guidance on weight management.';
    }
    setStatus(bmiStatus);
    setAdvice(bmiAdvice);

    // 新增到歷史記錄
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        date: new Date().toLocaleString(),
        weight,
        height,
        bmi: bmiValue,
        status: bmiStatus,
      },
    ]);
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setStatus('');
    setAdvice('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>
      <div className="input-group">
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
          />
        </label>
      </div>
      <button onClick={calculateBMI} className="caculator-button">Calculate</button>
      <button onClick={resetForm} className="reset-button">Clear</button>
      {bmi && (
        <div className="result">
          <h3>Your BMI: {bmi}</h3>
          <h3>Status: {status}</h3>
          <p>{advice}</p>
        </div>
      )}

      {/* 歷史記錄區塊 */}
      <div className="history">
        <h2>History</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <strong>Date:</strong> {entry.date} | <strong>Weight:</strong> {entry.weight} kg |{' '}
                <strong>Height:</strong> {entry.height} cm | <strong>BMI:</strong> {entry.bmi} |{' '}
                <strong>Status:</strong> {entry.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
        {history.length > 0 && <button onClick={clearHistory}>Clear History</button>}
      </div>
    </div>
  );
};

export default BmiCalculator;
