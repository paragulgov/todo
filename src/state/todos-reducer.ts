import {FilterValueType, TodoType} from '../App'
import {v1} from 'uuid'

export type RemoveTodoActionType = {
  type: 'REMOVE-TODO'
  todoId: string
}

export type AddTodoActionType = {
  type: 'ADD-TODO'
  title: string
  todoId: string
}

export type ChangeTodoTitleActionType = {
  type: 'CHANGE-TODO-TITLE'
  todoId: string
  title: string
}

export type ChangeTodoFilterActionType = {
  type: 'CHANGE-TODO-FILTER'
  todoId: string
  filter: FilterValueType
}

type ActionType = RemoveTodoActionType | AddTodoActionType | ChangeTodoTitleActionType | ChangeTodoFilterActionType

const initialState: Array<TodoType> = []

export const todosReducer = (state: Array<TodoType> = initialState, action: ActionType): Array<TodoType> => {
  switch (action.type) {
    case 'REMOVE-TODO': {
      return state.filter(todo => todo.id !== action.todoId)
    }
    case 'ADD-TODO': {
      const newTodo: TodoType = {
        id: action.todoId,
        title: action.title,
        filter: 'all'
      }
      return [newTodo, ...state]
    }
    case 'CHANGE-TODO-TITLE': {
      return state.map(todo => {
        if (todo.id === action.todoId) {
          return {...todo, title: action.title}
        } else {
          return todo
        }
      })
    }
    case 'CHANGE-TODO-FILTER': {
      return state.map(todo => {
        if (todo.id === action.todoId) {
          return {...todo, filter: action.filter}
        } else {
          return todo
        }
      })
    }
    default:
      return state
  }
}

export const removeTodoAC = (todoId: string): RemoveTodoActionType => {
  return {type: 'REMOVE-TODO', todoId}
}

export const addTodoAC = (title: string): AddTodoActionType => {
  return {type: 'ADD-TODO', title, todoId: v1()}
}

export const changeTodoTitleAC = (todoId: string, title: string): ChangeTodoTitleActionType => {
  return {type: 'CHANGE-TODO-TITLE', todoId, title}
}

export const changeTodoFilterAC = (todoId: string, filter: FilterValueType): ChangeTodoFilterActionType => {
  return {type: 'CHANGE-TODO-FILTER', todoId, filter}
}

