import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer,
  TasksType
} from '../tasks-reducer'
import {addTodoAC, removeTodoAC, setTodosAC} from '../todos-reducer'
import {TaskPriority, TaskStatus} from '../../api/todo-api'

test('correct task should be deleted from correct array', () => {
  const startState: TasksType = {
    'todoId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      }
    ],
    'todoId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ]
  }

  const action = removeTaskAC('2', 'todoId2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todoId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      }
    ],
    'todoId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ]
  })

})

test('correct task should be added to correct array', () => {
  const startState: TasksType = {
    'todoId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      }
    ],
    'todoId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ]
  }

  const action = addTaskAC('todoId2', 'strawberry')

  const endState = tasksReducer(startState, action)

  expect(endState['todoId1'].length).toBe(3)
  expect(endState['todoId2'].length).toBe(4)
  expect(endState['todoId2'][0].id).toBeDefined()
  expect(endState['todoId2'][0].title).toBe('strawberry')
  expect(endState['todoId2'][0].status).toBe(TaskStatus.New)
})

test('status of specified task should be changed', () => {
  const startState: TasksType = {
    'todoId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ],
    'todoId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ]
  }

  const action = changeTaskStatusAC('2', 'todoId2', TaskStatus.New)

  const endState = tasksReducer(startState, action)

  expect(endState['todoId2'][1].status).toBeFalsy()
  expect(endState['todoId1'][1].status).toBeTruthy()
})

test('title of specified task should be changed', () => {
  const startState: TasksType = {
    'todoId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ],
    'todoId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ]
  }

  const action = changeTaskTitleAC('2', 'todoId2', 'Nesquik')
  const endState = tasksReducer(startState, action)

  expect(endState['todoId2'][1].title).toBe('Nesquik')
  expect(endState['todoId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
  const startState: TasksType = {
    'todoId1': [
      {
        id: '1', title: 'CSS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2', title: 'JS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3', title: 'React',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ],
    'todoId2': [
      {
        id: '1', title: 'bread',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ]
  }

  const action = addTodoAC('new todolist')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todoId1' && k !== 'todoId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const startState: TasksType = {
    'todoId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3', title: 'React',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ],
    'todoId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ]
  }

  const action = removeTodoAC('todoId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todos', () => {

  const action = setTodosAC([
    {id: 'todoId1', title: 'What to learn', order: 0, addedDate: ''},
    {id: 'todoId2', title: 'What to buy', order: 0, addedDate: ''}
  ])

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['todoId1']).toStrictEqual([])
  expect(endState['todoId2']).toStrictEqual([])
})

test('tasks should be added for todo', () => {
  const startState: TasksType = {
    'todoId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId1'
      }
    ],
    'todoId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
        todoId: 'todoId2'
      }
    ]
  }

  const action = setTasksAC(startState['todoId2'], 'todoId1')

  const endState = tasksReducer({
    'todoId2': [],
    'todoId1': []
  }, action)


  expect(endState['todoId1'].length).toBe(3)
  expect(endState['todoId2'].length).toBe(0)
})
