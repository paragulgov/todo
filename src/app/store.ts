import {tasksReducer} from '../features/Todos/tasks-reducer'
import {todosReducer} from '../features/Todos/todos-reducer'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import ReduxThunk from 'redux-thunk'
import {appReducer} from './app-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todos: todosReducer,
  app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
