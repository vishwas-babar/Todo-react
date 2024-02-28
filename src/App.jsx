import { useEffect, useState } from 'react'
import Main from './components/Main'
import { useTodoContext, TodoProvider } from './contexts/TodoContext';

function App() {
  // const [todos, setTodos] = useState([]); // here due to this the local storage is getting vanished because the we are asigning the value to todos and the useeffect is running to change the value local storage

  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos || [];
  });

  const addTodo = (todo) => {
    setTodos((prev) => {
      return [...prev, { id: Date.now(), ...todo }]
    })
  }

  function deleteAll() {
    return setTodos([]);
  }

  const updateTodo = (id, updatedTodo) => {

    setTodos((prev) => prev.map(todo => todo.id == id ? {...todo, title: updatedTodo.title, dueDate: updatedTodo.dueDate} : todo))

  }

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => (todo.id != id)))
    // setTodos([])
  }

  const completeTodo = (id) => {

    setTodos(prev => prev.map(prevtodo => prevtodo.id == id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo))

  }

  useEffect(() => {
    
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])
  

  // when page loads load the data form loacal storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    console.log('getting todos');

    if (storedTodos && storedTodos.length > 0) {
      console.log("getting todos now on the way");
      setTodos(storedTodos);
    }

  }, [])

  return (
    <TodoProvider value={{ todos, addTodo, deleteAll, removeTodo, updateTodo, completeTodo }} >
      <Main />
    </TodoProvider>
  )
}

export default App
