import {addTodoAC, TodoDomainType, todosReducer} from '../todos-reducer'
import {tasksReducer, TasksType} from '../tasks-reducer'

test('ids should be equals', () => {
  const startTasksState: TasksType = {};
  const startTodosState: Array<TodoDomainType> = [];

  const action = addTodoAC({
    id: 'id',
    addedDate: '',
    order: 0,
    title: ''
  });

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodosState = todosReducer(startTodosState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodos = endTodosState[0].id;

  expect(idFromTasks).toBe('id');
  expect(idFromTodos).toBe('id');
});
