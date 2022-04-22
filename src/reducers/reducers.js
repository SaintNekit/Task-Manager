import {
  CREATE_TASK,
  DELETE_SUBTASK,
  FETCH_TASKS,
  FETCH_SUBTASKS,
  DELETE_TASK,
  ON_SORT_TASKS,
} from 'constants/index'

export const initialState = {
  tasks: [],
  subTasks: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      }
    }

    case FETCH_TASKS: {
      return { ...state, tasks: action.payload.tasks }
    }

    case FETCH_SUBTASKS: {
      return {
        ...state,
        subTasks: [...state.subTasks, ...action.payload.subTasks],
      }
    }

    case DELETE_SUBTASK: {
      const newSubTaskList = state.subTasks.filter(item => item.id !== action.payload.id)

      return {
        ...state,
        subTasks: newSubTaskList,
      }
    }

    case DELETE_TASK: {
      const newTaskList = state.tasks.filter(item => item.id !== action.payload.id)

      return { ...state, tasks: newTaskList }
    }

    case ON_SORT_TASKS: {
      const sortedTasks = state.tasks.slice().sort((first, second) => {
        if (action.payload.sortMethod === 'title') {
          if (first.title.toLowerCase() > second.title.toLowerCase()) {
            return 1
          }
          if (first.title.toLowerCase() < second.title.toLowerCase()) {
            return -1
          }

          return 0
        }
        if (action.payload.sortMethod === 'date') {
          return new Date(first.createTime) - new Date(second.createTime)
        }

        return false
      })

      return { ...state, tasks: sortedTasks }
    }

    default: {
      return state
    }
  }
}

export default reducer
