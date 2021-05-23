import React, {useState} from 'react'
import './App.css'
import {TasksType, Todo} from './Todo'
import {v1} from 'uuid'

type TodoType = {
  id: string
  title: string
  filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'

const App = () => {

  const todoId1 = v1()
  const todoId2 = v1()

  const [todos, setTodos] = useState<Array<TodoType>>([
    {id: todoId1, title: 'Learn', filter: 'all'},
    {id: todoId2, title: 'Buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TasksType>({
    [todoId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
    ],
    [todoId2]: [
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'REST', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ]
  })

  const removeTask = (id: string, todoId: string) => {
    tasks[todoId] = tasks[todoId].filter(task => task.id !== id)
    setTasks({...tasks})
  }

  const addTask = (title: string, todoId: string) => {
    const newTask = {id: v1(), title: title, isDone: false}
    tasks[todoId] = [newTask, ...tasks[todoId]]
    setTasks({...tasks})
  }

  const changeFilter = (value: FilterValueType, todoId: string) => {
    const todo = todos.find(todo => todo.id === todoId)
    if (todo) {
      todo.filter = value
      setTodos([...todos])
    }
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todoId: string) => {
    const changedTask = tasks[todoId].find(task => task.id === taskId)
    if (changedTask) {
      changedTask.isDone = isDone
      setTasks({...tasks})
    }
  }

  const removeTodo = (todoId: string) => {
    let todosAfterRemove = todos.filter(todo => todo.id !== todoId)
    setTodos(todosAfterRemove)

    delete tasks[todoId]
    setTasks({...tasks})
  }

  return (
    <div className="App">
      {
        todos.map(todo => {

          if (todo.filter === 'active') {
            tasks[todo.id] = tasks[todo.id].filter(task => !task.isDone)
          }

          if (todo.filter === 'completed') {
            tasks[todo.id] = tasks[todo.id].filter(task => task.isDone)
          }

          return (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              tasks={tasks[todo.id]}
              removeTask={removeTask}
              addTask={addTask}
              changeFilter={changeFilter}
              changeTaskStatus={changeTaskStatus}
              filter={todo.filter}
              removeTodo={removeTodo}
            />
          )
        })
      }
    </div>
  )
}

export default App
