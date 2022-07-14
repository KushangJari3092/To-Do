import React, { createContext, useState } from 'react'
import './style/App.css';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css'

export const ListContext = createContext();

function getFromLocalStorage() {


  let tasks = localStorage.getItem('task');

  if (tasks) {
    return JSON.parse(tasks);
  }
  else {
    return [];
  }
}


function App() {

  const [taskList, setTaskList] = useState([]);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(true);
  const [count, setCount] = useState(1);
  const [allTask, setAllTasks] = useState(getFromLocalStorage());

  return (
    <>
      <ListContext.Provider value={{ taskList, input, setTaskList, setInput, allTask, setAllTasks, checked, setChecked, count, setCount }}>
        <TodoList />
      </ListContext.Provider>
    </>
  );
}

export default App;
