// App.js
import React, { useState } from 'react';
import BmiCalculator from './BmiCalculator';
import TodoList from './TodoList';
import Calendar from './Calendar';
import './App.css';

const App = () => {
  const [selectedOption, setSelectedOption] = useState('bmi');

  const renderContent = () => {
    switch (selectedOption) {
      case 'bmi':
        return <BmiCalculator />;
      case 'todo':
        return <TodoList />;
      case 'calendar':
        return <Calendar />;
      default:
        return <BmiCalculator />;
    }
  };

  return (
    <div className='app'>
      <h1>Health & Productivity App</h1>
      <nav>
        <button onClick={() => setSelectedOption('bmi')}>BMI Calculator</button>
        <button onClick={() => setSelectedOption('todo')}>To-Do List</button>
        <button onClick={() => setSelectedOption('calendar')}>Calendar</button>
      </nav>
      <div className='content'>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
