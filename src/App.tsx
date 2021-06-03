import React, {useCallback, useEffect} from 'react'
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
import {
  addTodoTC,
  changeTodoFilterAC,
  changeTodoTitleTC,
  deleteTodoTC,
  fetchTodosTC,
  TodoDomainType,
  TodoFilterValueType
} from './state/todos-reducer'
import {addTaskTC, deleteTasksTC, TasksType, updateTaskTC} from './state/tasks-reducer'
import {TaskStatus} from './api/todo-api'

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

  const todos = useSelector<AppRootStateType, Array<TodoDomainType>>(state => state.todos)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodosTC())
  }, [dispatch])

  const addTodo = useCallback((title: string) => {
    dispatch(addTodoTC(title))
  }, [dispatch])

  const changeTodoFilter = useCallback((value: TodoFilterValueType, todoId: string) => {
    dispatch(changeTodoFilterAC(todoId, value))
  }, [dispatch])

  const changeTodoTitle = useCallback((title: string, todoId: string) => {
    dispatch(changeTodoTitleTC(todoId, title))
  }, [dispatch])

  const removeTodo = useCallback((todoId: string) => {
    dispatch(deleteTodoTC(todoId))
  }, [dispatch])

  const changeTaskStatus = useCallback((taskId: string, todoId: string, status: TaskStatus) => {
    dispatch(updateTaskTC(todoId, taskId, {status}))
  }, [dispatch])

  const addTask = useCallback((title: string, todoId: string) => {
    dispatch(addTaskTC(title, todoId))
  }, [dispatch])

  const removeTask = useCallback((taskId: string, todoId: string) => {
    dispatch(deleteTasksTC(todoId, taskId))
  }, [dispatch])

  const changeTaskTitle = useCallback((taskId: string, todoId: string, title: string) => {
    dispatch(updateTaskTC(todoId, taskId, {title}))
  }, [dispatch])

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
              return (
                <Grid item key={todo.id}>
                  <Paper style={{padding: '10px'}} elevation={5}>
                    <Todo
                      todoId={todo.id}
                      todoTitle={todo.title}
                      changeTodoFilter={changeTodoFilter}
                      todoFilter={todo.filter}
                      removeTodo={removeTodo}
                      changeTodoTitle={changeTodoTitle}
                      tasks={tasks[todo.id]}
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
