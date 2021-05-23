import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValueType} from './App'

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [key: string]: Array<TaskType>
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todoId: string) => void
  addTask: (title: string, todoId: string) => void
  changeFilter: (value: FilterValueType, todoId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
  filter: FilterValueType
  removeTodo: (todoId: string) => void
}

export const Todo = (props: PropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(title, props.id)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addTask()
    }
  }

  const removeTodo = () => {
    props.removeTodo(props.id)
  }

  const allClickHandler = () => props.changeFilter('all', props.id)
  const activeClickHandler = () => props.changeFilter('active', props.id)
  const completedClickHandler = () => props.changeFilter('completed', props.id)

  return (
    <div>
      <h3>{props.title}
        <button onClick={removeTodo}>X</button>
      </h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>

        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(task => {
            const onClickHandler = () => props.removeTask(task.id, props.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newIsDoneValue = e.currentTarget.checked
              props.changeTaskStatus(task.id, newIsDoneValue, props.id)
            }

            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={onChangeHandler}
                />
                <span>{task.title}</span>
                <button onClick={onClickHandler}>X</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={allClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={activeClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={completedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
