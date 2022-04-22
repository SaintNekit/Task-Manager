import reducers, { initialState } from 'reducers'
import {
  fetchTasksAction,
  deleteSubtaskAction,
  createNewTaskAction,
  fetchSubtasksAction,
  deleteTaskAction,
  sortAction,
} from 'actions'

const tasks = [
  { id: 1, title: 'Lorem ipsum', createTime: 1650286496640 },
  { id: 2, title: 'Figuar alor', createTime: 1650286496840 },
  { id: 3, title: 'Dolor amet', createTime: 1650286491640 },
]

const subTasks = [
  { id: '10', title: 'Redux code', taskId: 1 },
  { id: '20', title: 'We might change', taskId: 2 },
  { id: '30', title: 'Redux entirely', taskId: 3 },
]

test('should return the initial state', () => {
  expect(reducers(undefined, {})).toStrictEqual({ tasks: [], subTasks: [] })
})

test('create task', () => {
  const newTask = { id: 6, title: 'Deus vult', createTime: 1650286491440 }

  expect(reducers({ ...initialState, tasks }, createNewTaskAction(newTask))).toEqual({
    ...initialState,
    tasks: [...tasks, newTask],
  })
})

test('fetch tasks', () => {
  expect(reducers({ ...initialState, tasks }, fetchTasksAction(tasks))).toEqual({
    ...initialState,
    tasks: tasks,
  })
})

test('fetch subtasks', () => {
  expect(reducers(initialState, fetchSubtasksAction(subTasks))).toEqual({
    ...initialState,
    subTasks: subTasks,
  })
})

test('delete tasks', () => {
  expect(reducers({ ...initialState, tasks: tasks }, deleteTaskAction(1))).toEqual({
    ...initialState,
    tasks: tasks.filter(el => el.id !== 1),
  })
})

test('delete subtask', () => {
  expect(reducers({ ...initialState, subTasks: subTasks }, deleteSubtaskAction('10'))).toEqual({
    ...initialState,
    subTasks: subTasks.filter(el => el.id !== '10'),
  })
})

test('sort items', () => {
  expect(reducers({ ...initialState, tasks: tasks }, sortAction('title'))).toEqual({
    ...initialState,
    tasks: tasks.slice().sort((first, second) => {
      if (first.title.toLowerCase() > second.title.toLowerCase()) {
        return 1
      }
      if (first.title.toLowerCase() < second.title.toLowerCase()) {
        return -1
      }

      return 0
    }),
  })
})
