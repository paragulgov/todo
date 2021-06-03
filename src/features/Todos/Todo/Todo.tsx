import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TodoFilterValueType} from '../todos-reducer'
import {TaskStatus, TaskType} from '../../../api/todo-api'
import {useDispatch} from 'react-redux'
import {fetchTasksTC} from '../tasks-reducer'

type TodoPropsType = {
  todoId: string
  todoTitle: string
  changeTodoFilter: (value: TodoFilterValueType, todoId: string) => void
  changeTodoTitle: (title: string, todoId: string) => void
  todoFilter: TodoFilterValueType
  removeTodo: (todoId: string) => void
  tasks: Array<TaskType>
  addTask: (title: string, todoId: string) => void
  removeTask: (taskId: string, todoId: string) => void
  changeTaskTitle: (taskId: string, todoId: string, title: string) => void
  changeTaskStatus: (taskId: string, todoId: string, status: TaskStatus) => void
}

export const Todo: React.FC<TodoPropsType> = React.memo((props) => {

  const {
    tasks,
    todoId,
    addTask,
    todoTitle,
    todoFilter,
    removeTask,
    changeTodoTitle,
    changeTodoFilter,
    changeTaskStatus,
    changeTaskTitle,
    removeTodo
  } = props

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todoId))
  }, [dispatch, todoId])

  const onRemoveTodo = () => removeTodo(todoId)

  const onChangeTodoTitle = useCallback((title: string) => {
    return changeTodoTitle(title, todoId)
  }, [changeTodoTitle, todoId])

  const onAddTask = useCallback((title: string) => {
    return addTask(title, todoId)
  }, [addTask, todoId])

  const allClickHandler = useCallback(() => {
    return changeTodoFilter('all', todoId)
  }, [changeTodoFilter, todoId])

  const activeClickHandler = useCallback(() => {
    return changeTodoFilter('active', todoId)
  }, [changeTodoFilter, todoId])

  const completedClickHandler = useCallback(() => {
    return changeTodoFilter('completed', todoId)
  }, [changeTodoFilter, todoId])

  let tasksForTodo = tasks

  if (todoFilter === 'active') {
    tasksForTodo = tasks.filter(task => task.status === TaskStatus.New)
  }

  if (todoFilter === 'completed') {
    tasksForTodo = tasks.filter(task => task.status === TaskStatus.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={todoTitle} changeTitle={onChangeTodoTitle} />
        <IconButton onClick={onRemoveTodo}>
          <Delete fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={onAddTask} />
      <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
        {
          tasksForTodo.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                todoId={todoId}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}
              />
            )
          })
        }
      </ul>
      <div>
        <Button
          onClick={allClickHandler}
          color="secondary"
          variant={todoFilter === 'all' ? 'outlined' : 'text'}
          size="small"
        >
          All
        </Button>
        <Button
          onClick={activeClickHandler}
          color="secondary"
          variant={todoFilter === 'active' ? 'outlined' : 'text'}
          size="small"
        >
          Active
        </Button>
        <Button
          onClick={completedClickHandler}
          color="secondary"
          variant={todoFilter === 'completed' ? 'outlined' : 'text'}
          size="small"
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
