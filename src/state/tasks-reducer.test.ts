import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksType} from '../App'
import {addTodoAC, removeTodoAC} from './todos-reducer'

test('correct task should be deleted from correct array', () => {
  const startState: TasksType = {
    'todoId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = removeTaskAC('2', 'todoId2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todoId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false}
    ]
  })

})

test('correct task should be added to correct array', () => {
  const startState: TasksType = {
    'todoId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = addTaskAC('todoId2', 'strawberry')

  const endState = tasksReducer(startState, action)

  expect(endState['todoId1'].length).toBe(3)
  expect(endState['todoId2'].length).toBe(4)
  expect(endState['todoId2'][0].id).toBeDefined()
  expect(endState['todoId2'][0].title).toBe('strawberry')
  expect(endState['todoId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
  const startState: TasksType = {
    'todoId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = changeTaskStatusAC('2', 'todoId2', false)

  const endState = tasksReducer(startState, action)

  expect(endState['todoId2'][1].isDone).toBeFalsy()
  expect(endState['todoId1'][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {
  const startState: TasksType = {
    'todoId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
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
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
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
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = removeTodoAC('todoId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
