import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatus, TaskType} from '../../../../api/todo-api'

type TaskPropsType = {
  task: TaskType
  todoId: string
  removeTask: (taskId: string, todoId: string) => void
  changeTaskStatus: (taskId: string, todoId: string, status: TaskStatus) => void
  changeTaskTitle: (taskId: string, todoId: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(props => {
  const {
    task,
    todoId,
    changeTaskTitle
  } = props

  const onClickHandler = () => props.removeTask(props.task.id, props.todoId)

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked
    props.changeTaskStatus(props.task.id, props.todoId, newStatus ? TaskStatus.Completed : TaskStatus.New)
  }

  const onChangeTaskTitleHandler = useCallback((title: string) => {
    changeTaskTitle(task.id, todoId, title)
  }, [changeTaskTitle, task.id, todoId])

  return (
    <li key={props.task.id} className={props.task.status === TaskStatus.Completed ? 'is-done' : ''}>
      <Checkbox
        checked={props.task.status === TaskStatus.Completed}
        onChange={onChangeTaskStatusHandler}
      />
      <EditableSpan title={props.task.title} changeTitle={onChangeTaskTitleHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  )
})
