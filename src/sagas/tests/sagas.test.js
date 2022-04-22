import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import sagas from 'sagas'
import { createTask, deleteTask, fetchTasks } from 'api/tasks'
import { deleteSubtask, fetchSubTasks } from 'api/subTasks'
import {
  fetchTasksAction,
  deleteSubtaskAction,
  createNewTaskAction,
  fetchSubtasksAction,
  deleteTaskAction,
  OnDeleteTaskAction,
  onCreateTaskError,
  onFetchTasksError,
  onFetchSubtasksError,
  onDeleteSubtaskError,
  onDeleteTaskError,
  onTaskCreateAction,
  onDeleteSubtaskAction,
  onFetchTasksAction,
  onFetchSubtasksAction,
} from 'actions'

const error = new Error('error')

const fakeTask = { id: 42, name: 'John Doe' }

const fakeSubTasks = [{ taskId: '1', title: 'Saint', id: '10' }]

describe('getTasks', () => {
  it('Success', () =>
    expectSaga(sagas)
      .dispatch(onFetchTasksAction())
      .provide([[matchers.call.fn(fetchTasks), fakeTask]])
      .put(fetchTasksAction(fakeTask))
      .run())

  it('Error', () =>
    expectSaga(sagas)
      .dispatch(onFetchTasksAction())
      .provide([[matchers.call.fn(fetchTasks), throwError(error)]])
      .put(onFetchTasksError(error))
      .run())
})

describe('createNewTask', () => {
  it('Success', () =>
    expectSaga(sagas)
      .dispatch(onTaskCreateAction())
      .provide([[matchers.call.fn(createTask), fakeTask]])
      .put(createNewTaskAction(fakeTask))
      .run())

  it('Error', () =>
    expectSaga(sagas)
      .dispatch(onTaskCreateAction())
      .provide([[matchers.call.fn(createTask), throwError(error)]])
      .put(onCreateTaskError(error))
      .run())
})

describe('removeTask', () => {
  it('Success', () =>
    expectSaga(sagas)
      .dispatch(OnDeleteTaskAction(42))
      .provide([[matchers.call.fn(deleteTask), { id: 42 }]])
      .put(deleteTaskAction(42))
      .run())

  it('Error', () =>
    expectSaga(sagas)
      .dispatch(OnDeleteTaskAction(42))
      .provide([[matchers.call.fn(deleteTask), throwError(error)]])
      .put(onDeleteTaskError(error))
      .run())
})

describe('getSubtasks', () => {
  it('Success', () =>
    expectSaga(sagas)
      .dispatch(onFetchSubtasksAction(42))
      .provide([[matchers.call.fn(fetchSubTasks), { ...fakeSubTasks[0] }]])
      .put(fetchSubtasksAction(...fakeSubTasks))
      .run())

  it('Error', () =>
    expectSaga(sagas)
      .dispatch(onFetchSubtasksAction(50))
      .provide([[matchers.call.fn(fetchSubTasks), throwError(error)]])
      .put(onFetchSubtasksError(error))
      .run())
})

describe('removeSubtask', () => {
  it('Success', () =>
    expectSaga(sagas)
      .dispatch(onDeleteSubtaskAction(10, 41))
      .provide([[matchers.call.fn(deleteSubtask), { id: 10 }]])
      .put(deleteSubtaskAction(10))
      .run())

  it('Error', () =>
    expectSaga(sagas)
      .dispatch(onDeleteSubtaskAction())
      .provide([[matchers.call.fn(deleteSubtask), throwError(error)]])
      .put(onDeleteSubtaskError(error))
      .run())
})
