// TodoList.js
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false); // 控制已完成清單的顯示

  const addTask = (isDaily) => {
    if (newTask.trim() === '') {
      alert('Please enter a task!');
      return;
    }
    const newTaskObj = { text: newTask, completed: false };
    
    if (isDaily) {
      setDailyTasks([...dailyTasks, newTaskObj]);
    } else {
      setTodayTasks([...todayTasks, newTaskObj]);
    }

    setNewTask('');
  };

  const toggleTask = (taskList, setTaskList, index) => {
    const updatedTasks = taskList.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);

    // 移動到已完成事項
    if (updatedTasks[index].completed) {
      const completedTask = updatedTasks[index];
      setCompletedTasks([...completedTasks, completedTask]);
      setTaskList(updatedTasks.filter((_, i) => i !== index));
    }
  };

  const deleteTask = (taskList, setTaskList, index) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);
  };

  return (
    <div className='todo-container'>
      <h2>To-Do List</h2>
      <div className='input-group'>
        <input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='Enter a new task'
        />
        <button onClick={() => addTask(true)}>Daily</button>
        <button onClick={() => addTask(false)}>Today</button>
      </div>

      <button className='completed-toggle' onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
      </button>

      {showCompleted && (
        <div className='completed-tasks'>
          <h3>Completed Tasks</h3>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index} className='completed'>
                <span>{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='task-lists'>
        <div className='task-group daily'>
          <h3>Daily Tasks</h3>
          <ul>
            {dailyTasks.map((task, index) => (
              <li key={index} className={task.completed ? 'completed' : ''}>
                <span>{task.text}</span>
                <button onClick={() => toggleTask(dailyTasks, setDailyTasks, index)} className="finish-button">
                  Finish
                </button>
                <button onClick={() => deleteTask(dailyTasks, setDailyTasks, index)} className="delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className='task-group today'>
          <h3>Today's Tasks</h3>
          <ul>
            {todayTasks.map((task, index) => (
              <li key={index} className={task.completed ? 'completed' : ''}>
                <span>{task.text}</span>
                <button onClick={() => toggleTask(todayTasks, setTodayTasks, index)} className="finish-button">
                  Finish
                </button>
                <button onClick={() => deleteTask(todayTasks, setTodayTasks, index)} className="delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
