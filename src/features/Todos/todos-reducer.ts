import {Dispatch} from 'redux'
import {todoAPI, TodoType} from '../../api/todo-api'

const initialState: Array<TodoDomainType> = []

export const todosReducer = (state: Array<TodoDomainType> = initialState, action: ActionType): Array<TodoDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODO':
      return state.filter(todo => todo.id !== action.todoId)
    case 'ADD-TODO':
      return [{...action.todo, filter: 'all'}, ...state]
    case 'CHANGE-TODO-TITLE':
      return state.map(todo => todo.id === action.todoId ? {...todo, title: action.title} : todo)
    case 'CHANGE-TODO-FILTER':
      return state.map(todo => todo.id === action.todoId ? {...todo, filter: action.filter} : todo)
    case 'SET-TODOS':
      return action.todos.map(todo => ({...todo, filter: 'all'}))
    default:
      return state
  }
}

// actions

export const removeTodoAC = (todoId: string) => {
  return {type: 'REMOVE-TODO', todoId} as const
}

export const addTodoAC = (todo: TodoType) => {
  return {type: 'ADD-TODO', todo} as const
}

export const changeTodoTitleAC = (todoId: string, title: string) => {
  return {type: 'CHANGE-TODO-TITLE', todoId, title} as const
}

export const changeTodoFilterAC = (todoId: string, filter: TodoFilterValueType) => {
  return {type: 'CHANGE-TODO-FILTER', todoId, filter} as const
}

export const setTodosAC = (todos: Array<TodoType>) => {
  return {type: 'SET-TODOS', todos} as const
}

// thunks

export const fetchTodosTC = () => (dispatch: Dispatch<ActionType>) => {
  todoAPI.getTodos()
    .then((res) => {
      dispatch(setTodosAC(res.data))
    })
}

export const deleteTodoTC = (todoId: string) => (dispatch: Dispatch<ActionType>) => {
  todoAPI.deleteTodo(todoId)
    .then((res) => {
      dispatch(removeTodoAC(todoId))
    })
}

export const addTodoTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
  todoAPI.createTodo(title)
    .then((res) => {
      dispatch(addTodoAC(res.data.data.item))
    })
}

export const changeTodoTitleTC = (todoId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
  todoAPI.updateTodo(todoId, title)
    .then((res) => {
      dispatch(changeTodoTitleAC(todoId, title))
    })
}

// types

export type SetTodosActionType = ReturnType<typeof setTodosAC>
export type RemoveTodoActionType = ReturnType<typeof removeTodoAC>
export type AddTodoActionType = ReturnType<typeof addTodoAC>

type ActionType =
  | RemoveTodoActionType
  | AddTodoActionType
  | SetTodosActionType
  | ReturnType<typeof changeTodoTitleAC>
  | ReturnType<typeof changeTodoFilterAC>

export type TodoFilterValueType = 'all' | 'active' | 'completed'
export type TodoDomainType = TodoType & {
  filter: TodoFilterValueType
}
