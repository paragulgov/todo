import React, {ChangeEvent} from 'react'
import {FilterValueType, TaskType} from './App'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {EditableSpan} from './components/EditableSpan/EditableSpan'
import {Button, Checkbox, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

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

export const Todo = (props: PropsType) => {

  const removeTodo = () => props.removeTodo(props.todoId)
  const changeTodoTitle = (title: string) => props.changeTodoTitle(title, props.todoId)

  const addTask = (title: string) => props.addTask(title, props.todoId)

  const allClickHandler = () => props.changeTodoFilter('all', props.todoId)
  const activeClickHandler = () => props.changeTodoFilter('active', props.todoId)
  const completedClickHandler = () => props.changeTodoFilter('completed', props.todoId)

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
          props.tasks.map(task => {
            const onClickHandler = () => props.removeTask(task.id, props.todoId)
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatus = e.currentTarget.checked
              props.changeTaskStatus(task.id, props.todoId, newStatus)
            }

            const onChangeTaskTitleHandler = (newValue: string) => {
              props.changeTaskTitle(task.id, props.todoId, newValue)
            }

            return (
              <li key={task.id} className={task.status ? 'is-done' : ''}>
                <Checkbox
                  checked={task.status}
                  onChange={onChangeTaskStatusHandler}
                />
                <EditableSpan title={task.title} changeTitle={onChangeTaskTitleHandler} />
                <IconButton onClick={onClickHandler}>
                  <Delete fontSize="small" />
                </IconButton>
              </li>
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
}
