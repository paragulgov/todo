import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from '../tasks-reducer'
import {TasksType} from '../../App'
import {addTodoAC, removeTodoAC} from '../todos-reducer'

test('correct task should be deleted from correct array', () => {
  const startState: TasksType = {
    'todoId1': [
      {id: '1', title: 'CSS', status: false},
      {id: '2', title: 'JS', status: true},
      {id: '3', title: 'React', status: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', status: false},
      {id: '2', title: 'milk', status: true},
      {id: '3', title: 'tea', status: false}
    ]
  }

  const action = removeTaskAC('2', 'todoId2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todoId1': [
      {id: '1', title: 'CSS', status: false},
      {id: '2', title: 'JS', status: true},
      {id: '3', title: 'React', status: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', status: false},
      {id: '3', title: 'tea', status: false}
    ]
  })

})

test('correct task should be added to correct array', () => {
  const startState: TasksType = {
    'todoId1': [
      {id: '1', title: 'CSS', status: false},
      {id: '2', title: 'JS', status: true},
      {id: '3', title: 'React', status: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', status: false},
      {id: '2', title: 'milk', status: true},
      {id: '3', title: 'tea', status: false}
    ]
  }

  const action = addTaskAC('todoId2', 'strawberry')

  const endState = tasksReducer(startState, action)

  expect(endState['todoId1'].length).toBe(3)
  expect(endState['todoId2'].length).toBe(4)
  expect(endState['todoId2'][0].id).toBeDefined()
  expect(endState['todoId2'][0].title).toBe('strawberry')
  expect(endState['todoId2'][0].status).toBe(false)
})

test('status of specified task should be changed', () => {
  const startState: TasksType = {
    'todoId1': [
      {id: '1', title: 'CSS', status: false},
      {id: '2', title: 'JS', status: true},
      {id: '3', title: 'React', status: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', status: false},
      {id: '2', title: 'milk', status: true},
      {id: '3', title: 'tea', status: false}
    ]
  }

  const action = changeTaskStatusAC('2', 'todoId2', false)

  const endState = tasksReducer(startState, action)

  expect(endState['todoId2'][1].status).toBeFalsy()
  expect(endState['todoId1'][1].status).toBeTruthy()
})

test('title of specified task should be changed', () => {
  const startState: TasksType = {
    'todoId1': [
      {id: '1', title: 'CSS', status: false},
      {id: '2', title: 'JS', status: true},
      {id: '3', title: 'React', status: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', status: false},
      {id: '2', title: 'milk', status: true},
      {id: '3', title: 'tea', status: false}
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
      {id: '1', title: 'CSS', status: false},
      {id: '2', title: 'JS', status: true},
      {id: '3', title: 'React', status: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', status: false},
      {id: '2', title: 'milk', status: true},
      {id: '3', title: 'tea', status: false}
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
      {id: '1', title: 'CSS', status: false},
      {id: '2', title: 'JS', status: true},
      {id: '3', title: 'React', status: false}
    ],
    'todoId2': [
      {id: '1', title: 'bread', status: false},
      {id: '2', title: 'milk', status: true},
      {id: '3', title: 'tea', status: false}
    ]
  }

  const action = removeTodoAC('todoId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
