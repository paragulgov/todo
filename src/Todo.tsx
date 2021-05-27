import React, {useCallback} from 'react'
import {FilterValueType, TaskType} from './App'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {EditableSpan} from './components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task'

type PropsType = {
  todoId: string
  todoTitle: string
  changeTodoFilter: (value: FilterValueType, todoId: string) => void
  changeTodoTitle: (title: string, todoId: string) => void
  todoFilter: FilterValueType
  removeTodo: (todoId: string) => void
  tasks: Array<TaskType>
  addTask: (title: string, todoId: string) => void
  removeTask: (taskId: string, todoId: string) => void
  changeTaskTitle: (taskId: string, todoId: string, title: string) => void
  changeTaskStatus: (taskId: string, todoId: string, status: boolean) => void
}

export const Todo = React.memo((props: PropsType) => {

  const removeTodo = () => props.removeTodo(props.todoId)

  const changeTodoTitle = useCallback((title: string) => {
    return props.changeTodoTitle(title, props.todoId)
  }, [props.changeTodoTitle, props.todoId])

  const addTask = useCallback((title: string) => {
    return props.addTask(title, props.todoId)
  }, [props.addTask, props.todoId])

  const allClickHandler = useCallback(() => {
    return props.changeTodoFilter('all', props.todoId)
  }, [props.changeTodoFilter, props.todoId])

  const activeClickHandler = useCallback(() => {
    return props.changeTodoFilter('active', props.todoId)
  }, [props.changeTodoFilter, props.todoId])

  const completedClickHandler = useCallback(() => {
    return props.changeTodoFilter('completed', props.todoId)
  }, [props.changeTodoFilter, props.todoId])

  let tasks = props.tasks

  if (props.todoFilter === 'active') {
    tasks = props.tasks.filter(task => !task.status)
  }

  if (props.todoFilter === 'completed') {
    tasks = props.tasks.filter(task => task.status)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.todoTitle} changeTitle={changeTodoTitle} />
        <IconButton onClick={removeTodo}>
          <Delete fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
        {
          tasks.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                todoId={props.todoId}
                removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}
              />
            )
          })
        }
      </ul>
      <div>
        <Button
          onClick={allClickHandler}
          color="secondary"
          variant={props.todoFilter === 'all' ? 'outlined' : 'text'}
          size="small"
        >
          All
        </Button>
        <Button
          onClick={activeClickHandler}
          color="secondary"
          variant={props.todoFilter === 'active' ? 'outlined' : 'text'}
          size="small"
        >
          Active
        </Button>
        <Button
          onClick={completedClickHandler}
          color="secondary"
          variant={props.todoFilter === 'completed' ? 'outlined' : 'text'}
          size="small"
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
