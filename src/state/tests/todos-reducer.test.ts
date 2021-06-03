import {v1} from 'uuid'
import {
  addTodoAC,
  changeTodoFilterAC,
  changeTodoTitleAC, TodoFilterValueType,
  removeTodoAC,
  TodoDomainType,
  todosReducer, setTodosAC
} from '../todos-reducer'


test('correct todo should be removed', () => {
  const todoId1 = v1()
  const todoId2 = v1()

  const startState: Array<TodoDomainType> = [
    {id: todoId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
  ]

  const action = removeTodoAC(todoId1)

  const endState = todosReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoId2)
})

test('correct todo should be added', () => {
  const todoId1 = v1()
  const todoId2 = v1()

  const newTodoTitle = 'New Todo'

  const startState: Array<TodoDomainType> = [
    {id: todoId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
  ]

  const action = addTodoAC({
    id: 'id',
    title: newTodoTitle,
    order: 0,
    addedDate: ''
  })

  const endState = todosReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodoTitle)
})

test('correct todo should change its title', () => {
  const todoId1 = v1()
  const todoId2 = v1()

  const newTodoTitle = 'New Todolist'

  const startState: Array<TodoDomainType> = [
    {id: todoId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
  ]

  const action = changeTodoTitleAC(todoId2, newTodoTitle)

  const endState = todosReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodoTitle)
})

test('correct filter of todo should be changed', () => {
  const todoId1 = v1()
  const todoId2 = v1()

  let newFilter: TodoFilterValueType = 'completed'

  const startState: Array<TodoDomainType> = [
    {id: todoId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
  ]

  const action = changeTodoFilterAC(todoId2, newFilter)

  const endState = todosReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todos should be set to state', () => {
  const startState: Array<TodoDomainType> = [
    {id: 'todoId1', title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: 'todoId2', title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
  ]

  const action = setTodosAC(startState)

  const endState = todosReducer([], action)

  expect(endState.length).toBe(2)
})

