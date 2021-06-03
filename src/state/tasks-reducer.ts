import {TaskPriority, TaskStatus, TaskType, todoAPI, UpdateTaskModelType} from '../api/todo-api'
import {AddTodoActionType, RemoveTodoActionType, SetTodosActionType} from './todos-reducer'
import {Dispatch} from 'redux'
import {AppRootStateType} from './store'

export type TasksType = {
  [key: string]: Array<TaskType>
}

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todoId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK'
  task: TaskType
}

export type UpdateTaskActionType = {
  type: 'UPDATE-TASK'
  taskId: string
  todoId: string
  model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  todoId: string
  title: string
}

export type SetTasksActionType = {
  type: 'SET-TASKS'
  tasks: Array<TaskType>
  todoId: string
}

type ActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | ChangeTaskTitleActionType
  | AddTodoActionType
  | RemoveTodoActionType
  | SetTodosActionType
  | SetTasksActionType

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
      debugger
      const stateCopy = {...state}
      const newTask = action.task
      const tasks = stateCopy[newTask.todoListId]
      stateCopy[newTask.todoListId] = [newTask, ...tasks]
      return stateCopy
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task => {
          if (task.id === action.taskId) {
            return {...task, ...action.model}
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
      return {...state, [action.todo.id]: []}
    }
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
    case 'SET-TASKS': {
      const copyState = {...state}

      copyState[action.todoId] = action.tasks

      return copyState
    }
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todoId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todoId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (taskId: string, todoId: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
  return {type: 'UPDATE-TASK', taskId, todoId, model}
}

export const setTasksAC = (tasks: Array<TaskType>, todoId: string): SetTasksActionType => {
  return {type: 'SET-TASKS', tasks, todoId}
}

export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch) => {
  todoAPI.getTasks(todoId)
    .then((res) => {
      dispatch(setTasksAC(res.data.items, todoId))
    })
}

export const deleteTasksTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
  todoAPI.deleteTask(todoId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(taskId, todoId))
    })
}

export const addTaskTC = (title: string, todoId: string) => (dispatch: Dispatch) => {
  todoAPI.createTask(todoId, title)
    .then((res) => {
      dispatch(addTaskAC(res.data.data.item))
    })
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}

export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
