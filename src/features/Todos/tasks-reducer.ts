import {TaskPriority, TaskStatus, TaskType, todoAPI, UpdateTaskModelType} from '../../api/todo-api'
import {AddTodoActionType, RemoveTodoActionType, SetTodosActionType} from './todos-reducer'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)}
    case 'ADD-TASK':
      return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
    case 'UPDATE-TASK':
      return {
        ...state, [action.todoId]: state[action.todoId].map(task => task.id === action.taskId
          ? {...task, ...action.model}
          : task
        )
      }
    case 'ADD-TODO':
      return {...state, [action.todo.id]: []}
    case 'REMOVE-TODO': {
      const stateCopy = {...state}
      delete stateCopy[action.todoId]
      return stateCopy
    }
    case 'SET-TODOS': {
      const copyState = {...state}
      action.todos.forEach(todo => {
        copyState[todo.id] = []
      })
      return copyState
    }
    case 'SET-TASKS':
      return {...state, [action.todoId]: action.tasks}
    default:
      return state
  }
}

// actions

export const removeTaskAC = (taskId: string, todoId: string) => {
  return {type: 'REMOVE-TASK', taskId, todoId} as const
}

export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}

export const updateTaskAC = (taskId: string, todoId: string, model: UpdateDomainTaskModelType) => {
  return {type: 'UPDATE-TASK', taskId, todoId, model} as const
}

export const setTasksAC = (tasks: Array<TaskType>, todoId: string) => {
  return {type: 'SET-TASKS', tasks, todoId} as const
}

// thunks

export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch<ActionType>) => {
  todoAPI.getTasks(todoId)
    .then((res) => {
      dispatch(setTasksAC(res.data.items, todoId))
    })
}

export const deleteTasksTC = (todoId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
  todoAPI.deleteTask(todoId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(taskId, todoId))
    })
}

export const addTaskTC = (title: string, todoId: string) => (dispatch: Dispatch<ActionType>) => {
  todoAPI.createTask(todoId, title)
    .then((res) => {
      dispatch(addTaskAC(res.data.data.item))
    })
}

export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {

    const state = getState()
    const task = state.tasks[todoId].find(task => task.id === taskId)
    if (!task) {
      console.warn('task not found')
      return
    }

    const apiModel: UpdateTaskModelType = {
      status: task.status,
      startDate: task.startDate,
      priority: task.priority,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      ...domainModel
    }

    todoAPI.updateTask(todoId, taskId, apiModel)
      .then((res) => {
        dispatch(updateTaskAC(taskId, todoId, domainModel))
      })

  }
}

// types

export type TasksType = {
  [key: string]: Array<TaskType>
}

type ActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | SetTodosActionType
  | RemoveTodoActionType
  | AddTodoActionType

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}