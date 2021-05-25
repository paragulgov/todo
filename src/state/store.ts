import {tasksReducer} from './tasks-reducer'
import {todosReducer} from './todos-reducer'
import {combineReducers, createStore} from 'redux'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todos: todosReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
