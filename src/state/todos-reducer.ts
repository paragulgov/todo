import {v1} from 'uuid'
import {TodoType} from '../api/todo-api'

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

const initialState: Array<TodoDomainType> = []

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoDomainType = TodoType & {
  filter: FilterValueType
}

export const todosReducer = (state: Array<TodoDomainType> = initialState, action: ActionType): Array<TodoDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODO': {
      return state.filter(todo => todo.id !== action.todoId)
    }
    case 'ADD-TODO': {
      const newTodo: TodoDomainType = {
        id: action.todoId,
        title: action.title,
        filter: 'all',
        addedDate: '',
        order: 0
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

