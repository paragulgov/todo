import {v1} from 'uuid'
import {FilterValueType, TodoType} from '../App'
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC, todosReducer} from './todos-reducer'


test('correct todo should be removed', () => {
  const todoId1 = v1()
  const todoId2 = v1()

  const startState: Array<TodoType> = [
    {id: todoId1, title: 'What to learn', filter: 'all'},
    {id: todoId2, title: 'What to buy', filter: 'all'}
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

  const startState: Array<TodoType> = [
    {id: todoId1, title: 'What to learn', filter: 'all'},
    {id: todoId2, title: 'What to buy', filter: 'all'}
  ]

  const action = addTodoAC(newTodoTitle)

  const endState = todosReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodoTitle)
})

test('correct todo should change its title', () => {
  const todoId1 = v1()
  const todoId2 = v1()

  const newTodoTitle = 'New Todolist'

  const startState: Array<TodoType> = [
    {id: todoId1, title: 'What to learn', filter: 'all'},
    {id: todoId2, title: 'What to buy', filter: 'all'}
  ]

  const action = changeTodoTitleAC(todoId2, newTodoTitle)

  const endState = todosReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodoTitle)
})

test('correct filter of todo should be changed', () => {
  const todoId1 = v1()
  const todoId2 = v1()

  let newFilter: FilterValueType = 'completed'

  const startState: Array<TodoType> = [
    {id: todoId1, title: 'What to learn', filter: 'all'},
    {id: todoId2, title: 'What to buy', filter: 'all'}
  ]

  const action = changeTodoFilterAC(todoId2, newFilter)

  const endState = todosReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
