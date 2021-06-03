import {tasksReducer} from './tasks-reducer'
import {todosReducer} from './todos-reducer'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todos: todosReducer
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
