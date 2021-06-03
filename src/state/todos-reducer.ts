import {Dispatch} from 'redux'
import {todoAPI, TodoType} from '../api/todo-api'

export type RemoveTodoActionType = {
  type: 'REMOVE-TODO'
  todoId: string
}

export type AddTodoActionType = {
  type: 'ADD-TODO'
  todo: TodoType
}

export type ChangeTodoTitleActionType = {
  type: 'CHANGE-TODO-TITLE'
  todoId: string
  title: string
}

export type ChangeTodoFilterActionType = {
  type: 'CHANGE-TODO-FILTER'
  todoId: string
  filter: TodoFilterValueType
}

export type SetTodosActionType = {
  type: 'SET-TODOS'
  todos: Array<TodoType>
}

type ActionType =
  RemoveTodoActionType
  | AddTodoActionType
  | ChangeTodoTitleActionType
  | ChangeTodoFilterActionType
  | SetTodosActionType

const initialState: Array<TodoDomainType> = []

export type TodoFilterValueType = 'all' | 'active' | 'completed'
export type TodoDomainType = TodoType & {
  filter: TodoFilterValueType
}

export const todosReducer = (state: Array<TodoDomainType> = initialState, action: ActionType): Array<TodoDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODO': {
      return state.filter(todo => todo.id !== action.todoId)
    }
    case 'ADD-TODO': {
      const newTodo: TodoDomainType = {...action.todo, filter: 'all'}
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
    case 'SET-TODOS': {
      return action.todos.map(todo => {
        return {
          ...todo,
          filter: 'all'
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

export const addTodoAC = (todo: TodoType): AddTodoActionType => {
  return {type: 'ADD-TODO', todo}
}

export const changeTodoTitleAC = (todoId: string, title: string): ChangeTodoTitleActionType => {
  return {type: 'CHANGE-TODO-TITLE', todoId, title}
}

export const changeTodoFilterAC = (todoId: string, filter: TodoFilterValueType): ChangeTodoFilterActionType => {
  return {type: 'CHANGE-TODO-FILTER', todoId, filter}
}

export const setTodosAC = (todos: Array<TodoType>): SetTodosActionType => {
  return {type: 'SET-TODOS', todos}
}

export const fetchTodosTC = () => (dispatch: Dispatch) => {
  todoAPI.getTodos()
    .then((res) => {
      dispatch(setTodosAC(res.data))
    })
}

export const deleteTodoTC = (todoId: string) => (dispatch: Dispatch) => {
  todoAPI.deleteTodo(todoId)
    .then((res) => {
      dispatch(removeTodoAC(todoId))
    })
}

export const addTodoTC = (title: string) => (dispatch: Dispatch) => {
  todoAPI.createTodo(title)
    .then((res) => {
      dispatch(addTodoAC(res.data.data.item))
    })
}

export const changeTodoTitleTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
  todoAPI.updateTodo(todoId, title)
    .then((res) => {
      dispatch(changeTodoTitleAC(todoId, title))
    })
}
