import {
  CREATE_TASK,
  DELETE_SUBTASK,
  FETCH_TASKS,
  FETCH_SUBTASKS,
  DELETE_TASK,
  ON_TASK_CREATE,
  ON_FETCH_TASKS,
  ON_FETCH_SUBTASKS,
  ON_DELETE_SUBTASK,
  ON_DELETE_TASK,
  ON_SORT_TASKS,
  ON_CREATE_TASK_ERROR,
  ON_FETCH_TASKS_ERROR,
  ON_FETCH_SUBTASKS_ERROR,
  ON_DELETE_SUBTASK_ERROR,
  ON_DELETE_TASK_ERROR,
} from 'constants/index'

export const onTaskCreateAction = () => ({ type: ON_TASK_CREATE })
export const createNewTaskAction = task => ({ type: CREATE_TASK, payload: { task } })
export const onCreateTaskError = error => ({ type: ON_CREATE_TASK_ERROR, payload: { error } })

export const onFetchTasksAction = () => ({ type: ON_FETCH_TASKS })
export const fetchTasksAction = tasks => ({ type: FETCH_TASKS, payload: { tasks } })
export const onFetchTasksError = error => ({ type: ON_FETCH_TASKS_ERROR, payload: { error } })

export const onFetchSubtasksAction = id => ({ type: ON_FETCH_SUBTASKS, payload: { id } })
export const fetchSubtasksAction = subTasks => ({ type: FETCH_SUBTASKS, payload: { subTasks } })
export const onFetchSubtasksError = error => ({ type: ON_FETCH_SUBTASKS_ERROR, payload: { error } })

export const onDeleteSubtaskAction = (id, taskId) => ({
  type: ON_DELETE_SUBTASK,
  payload: { id, taskId },
})
export const deleteSubtaskAction = id => ({ type: DELETE_SUBTASK, payload: { id } })
export const onDeleteSubtaskError = error => ({ type: ON_DELETE_SUBTASK_ERROR, payload: { error } })

export const OnDeleteTaskAction = id => ({ type: ON_DELETE_TASK, payload: { id } })
export const deleteTaskAction = id => ({ type: DELETE_TASK, payload: { id } })
export const onDeleteTaskError = error => ({ type: ON_DELETE_TASK_ERROR, payload: { error } })

export const sortAction = sortMethod => ({ type: ON_SORT_TASKS, payload: { sortMethod } })
