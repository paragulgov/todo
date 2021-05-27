import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from './components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskType} from './App'

type TaskPropsType = {
  task: TaskType
  todoId: string
  removeTask: (taskId: string, todoId: string) => void
  changeTaskStatus: (taskId: string, todoId: string, status: boolean) => void
  changeTaskTitle: (taskId: string, todoId: string, title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.task.id, props.todoId)

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked
    props.changeTaskStatus(props.task.id, props.todoId, newStatus)
  }

  const onChangeTaskTitleHandler = useCallback((title: string) => {
    props.changeTaskTitle(props.task.id, props.todoId, title)
  }, [props.changeTaskTitle, props.task.id, props.todoId])

  return (
    <li key={props.task.id} className={props.task.status ? 'is-done' : ''}>
      <Checkbox
        checked={props.task.status}
        onChange={onChangeTaskStatusHandler}
      />
      <EditableSpan title={props.task.title} changeTitle={onChangeTaskTitleHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  )
})
