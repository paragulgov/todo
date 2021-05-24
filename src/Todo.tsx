import React, {ChangeEvent} from 'react'
import {FilterValueType, TaskType} from './App'
import AddItemForm from './components/AddItemForm/AddItemForm'
import EditableSpan from './components/EditableSpan/EditableSpan'

type PropsType = {
  todoId: string
  todoTitle: string
  changeTodoFilter: (value: FilterValueType, todoId: string) => void
  changeTodoTitle: (title: string, todoId: string) => void
  todoFilter: FilterValueType
  removeTodo: (todoId: string) => void
  tasks: Array<TaskType>
  addTask: (title: string, todoId: string) => void
  removeTask: (id: string, todoId: string) => void
  changeTaskTitle: (taskId: string, title: string, todoId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
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
        <button onClick={removeTodo}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {
          props.tasks.map(task => {
            const onClickHandler = () => props.removeTask(task.id, props.todoId)
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newIsDoneValue = e.currentTarget.checked
              props.changeTaskStatus(task.id, newIsDoneValue, props.todoId)
            }

            const onChangeTaskTitleHandler = (newValue: string) => {
              props.changeTaskTitle(task.id, newValue, props.todoId)
            }

            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={onChangeTaskStatusHandler}
                />
                <EditableSpan title={task.title} changeTitle={onChangeTaskTitleHandler} />
                <button onClick={onClickHandler}>X</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button
          className={props.todoFilter === 'all' ? 'active-filter' : ''}
          onClick={allClickHandler}
        >
          All
        </button>
        <button
          className={props.todoFilter === 'active' ? 'active-filter' : ''}
          onClick={activeClickHandler}
        >
          Active
        </button>
        <button
          className={props.todoFilter === 'completed' ? 'active-filter' : ''}
          onClick={completedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
