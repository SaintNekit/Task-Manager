import { takeEvery, put, call, all, takeLeading } from 'redux-saga/effects'
import {
  ON_TASK_CREATE,
  ON_FETCH_TASKS,
  ON_FETCH_SUBTASKS,
  ON_DELETE_SUBTASK,
  ON_DELETE_TASK,
} from 'constants/index'
import { fetchTasks, createTask, deleteTask } from 'api/tasks'
import { fetchSubTasks, deleteSubtask } from 'api/subTasks'
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
} from 'actions'

export function* getTasks() {
  try {
    const tasks = yield call(fetchTasks)

    yield put(fetchTasksAction(tasks))
  } catch (e) {
    yield put(onFetchTasksError(e))
  }
}

export function* createNewTask() {
  try {
    const task = yield call(createTask)

    yield put(createNewTaskAction(task))
  } catch (e) {
    yield put(onCreateTaskError(e))
  }
}

export function* getSubtasks({ payload: { id } }) {
  try {
    const subTasks = yield call(fetchSubTasks, id)

    yield put(fetchSubtasksAction(subTasks))
  } catch (e) {
    yield put(onFetchSubtasksError(e))
  }
}

export function* removeTask({ payload: { id } }) {
  try {
    yield call(deleteTask, id)

    yield put(deleteTaskAction(id))
  } catch (e) {
    yield put(onDeleteTaskError(e))
  }
}

export function* removeSubtask({ payload: { id, taskId } }) {
  try {
    yield call(deleteSubtask, id)

    const isSubtasksExist = yield call(fetchSubTasks, taskId)

    if (!isSubtasksExist || !isSubtasksExist.length) {
      yield put(OnDeleteTaskAction(taskId))
    }

    yield put(deleteSubtaskAction(id))
  } catch (e) {
    yield put(onDeleteSubtaskError(e))
  }
}

function* sagas() {
  yield all([
    takeEvery(ON_FETCH_TASKS, getTasks),
    takeEvery(ON_TASK_CREATE, createNewTask),
    takeEvery(ON_FETCH_SUBTASKS, getSubtasks),
    takeLeading(ON_DELETE_TASK, removeTask),
    takeEvery(ON_DELETE_SUBTASK, removeSubtask),
  ])
}

export default sagas
