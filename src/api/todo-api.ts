import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'd4e93fe8-e0fb-4a22-9388-0b3da2212073'
  }
})

export type TodoType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TaskType = {
  id: string
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  todoListId: string
  order: number
  addedDate: string
}

export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Draft = 3,
  Urgently = 3,
  Later = 4
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

type ResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  data: T
}

type GetTasksResponse = {
  items: Array<TaskType>
  totalCount: number
  error: string | null
}

export const todoAPI = {
  getTodos() {
    return instance.get<Array<TodoType>>(`todo-lists`)
  },
  createTodo(title: string) {
    return instance.post<ResponseType<{ item: TodoType }>>(`todo-lists`, {title})
  },
  deleteTodo(todoId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}`)
  },
  updateTodo(todoId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
  },

  getTasks(todoId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todoId}/tasks`)
  },
  createTask(todoId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoId}/tasks`, {title})
  },
  deleteTask(todoId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
  },
  updateTask(todoId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todoId}/tasks/${taskId}`, model)
  }
}
