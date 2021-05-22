import React from 'react';
import './App.css';
import {Todo} from './Todo';

const App = () => {

  const task1 = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
  ]

  const task2 = [
    {id: 1, title: "Hello", isDone: false},
    {id: 2, title: "Todo", isDone: true},
    {id: 3, title: "Task", isDone: false},
  ]

  return (
    <div className="App">
      <Todo title="What to learn" tasks={task1} />
      <Todo title="What to buy" tasks={task2} />
    </div>
  );
}

export default App;
