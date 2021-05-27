import {TasksType, TaskType} from '../App'
import {v1} from 'uuid'
import {AddTodoActionType, RemoveTodoActionType} from './todos-reducer'

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todoId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK'
  todoId: string
  title: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  todoId: string
  status: boolean
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  todoId: string
  title: string
}

type ActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoActionType
  | RemoveTodoActionType

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)
      }
    }
    case 'ADD-TASK': {
      const newTask: TaskType = {id: v1(), title: action.title, status: false}
      return {
        ...state,
        [action.todoId]: [newTask, ...state[action.todoId]]
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task => {
          if (task.id === action.taskId) {
            return {...task, status: action.status}
          } else {
            return task
          }
        })
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task => {
          if (task.id === action.taskId) {
            return {...task, title: action.title}
          } else {
            return task
          }
        })
      }
    }
    case 'ADD-TODO': {
      return {...state, [action.todoId]: []}
    }
    case 'REMOVE-TODO': {
      const stateCopy = {...state}
      delete stateCopy[action.todoId]
      return stateCopy
    }
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todoId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todoId}
}

export const addTaskAC = (todoId: string, title: string): AddTaskActionType => {
  return {type: 'ADD-TASK', todoId, title}
}

export const changeTaskStatusAC = (taskId: string, todoId: string, status: boolean): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskId, todoId, status}
}

export const changeTaskTitleAC = (taskId: string, todoId: string, title: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskId, todoId, title}
}
