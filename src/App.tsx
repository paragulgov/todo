import React from 'react'
import './App.css'
import {Todo} from './Todo'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {
  AppBar,
  Button,
  Container,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from './state/todos-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer'

export type TodoType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TaskType = {
  id: string
  title: string
  status: boolean
}

export type TasksType = {
  [key: string]: Array<TaskType>
}

export type FilterValueType = 'all' | 'active' | 'completed'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)


const App = () => {
  const classes = useStyles()

  const todos = useSelector<AppRootStateType, Array<TodoType>>(state => state.todos)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
  const dispatch = useDispatch()

  const addTodo = (title: string) => {
    dispatch(addTodoAC(title))
  }

  const changeTodoFilter = (value: FilterValueType, todoId: string) => {
    dispatch(changeTodoFilterAC(todoId, value))
  }

  const changeTodoTitle = (title: string, todoId: string) => {
    dispatch(changeTodoTitleAC(todoId, title))
  }

  const removeTodo = (todoId: string) => {
    dispatch(removeTodoAC(todoId))
  }

  const changeTaskStatus = (taskId: string, todoId: string, status: boolean) => {
    dispatch(changeTaskStatusAC(taskId, todoId, status))
  }

  const addTask = (title: string, todoId: string) => {
    dispatch(addTaskAC(todoId, title))
  }

  const removeTask = (taskId: string, todoId: string) => {
    dispatch(removeTaskAC(taskId, todoId))
  }

  const changeTaskTitle = (taskId: string, todoId: string, title: string) => {
    dispatch(changeTaskTitleAC(taskId, todoId, title))
  }

  return (
    <div>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodo} />
        </Grid>
        <Grid container spacing={3}>
          {
            todos.map(todo => {
              let tasksForTodo = tasks[todo.id]

              if (todo.filter === 'active') {
                tasksForTodo = tasks[todo.id].filter(task => !task.status)
              }

              if (todo.filter === 'completed') {
                tasksForTodo = tasks[todo.id].filter(task => task.status)
              }

              return (
                <Grid item>
                  <Paper style={{padding: '10px'}} elevation={5}>
                    <Todo
                      key={todo.id}
                      todoId={todo.id}
                      todoTitle={todo.title}
                      changeTodoFilter={changeTodoFilter}
                      todoFilter={todo.filter}
                      removeTodo={removeTodo}
                      changeTodoTitle={changeTodoTitle}
                      tasks={tasksForTodo}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </div>
  )
}

export default App
