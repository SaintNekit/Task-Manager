import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { SubTaskItem } from 'components/molecules'
import { onFetchSubtasksAction } from 'actions'
import { Button } from 'components/atoms'
import { Wrapper, Title, CreatedTime, FlexBlock } from './TaskItem.styles'

const TaskItem = ({ title, createTime, id, searchValue, subTasksWithSelectedLabels }) => {
  const [isActive, setIsActive] = useState(true)
  const [showOnSearch, setShowOnSearch] = useState(true)
  const [showOnSelect, setShowOnSelect] = useState(true)
  const dispatch = useDispatch()
  const subTasksList = useSelector(({ reducers: { subTasks } }) => subTasks)

  const createdTime = moment(new Date(createTime)).format('llll')

  useEffect(() => {
    !searchValue?.length || title.toLowerCase().match(searchValue.toLowerCase())
      ? setShowOnSearch(true)
      : setShowOnSearch(false)
  }, [searchValue, title])

  useEffect(() => {
    if (subTasksWithSelectedLabels?.length) {
      const isShouldShow = subTasksWithSelectedLabels.find(subTask => subTask.taskId === id)

      if (isShouldShow) {
        setShowOnSelect(true)
      } else {
        setShowOnSelect(false)
      }
    } else {
      setShowOnSelect(true)
    }
  }, [subTasksWithSelectedLabels, id])

  const getSubtasks = useCallback(() => {
    dispatch(onFetchSubtasksAction(id))
    setIsActive(false)
  }, [dispatch, id])

  return showOnSelect ? (
    <>
      {showOnSearch && (
        <Wrapper>
          <Title>{title}</Title>
          <FlexBlock>
            <CreatedTime>{createdTime}</CreatedTime>
            {isActive && (
              <Button onClick={getSubtasks} type="get">
                Get subtasks
              </Button>
            )}
          </FlexBlock>
        </Wrapper>
      )}
      {subTasksList.map(
        item =>
          item.taskId === id && <SubTaskItem key={item.id} {...item} searchValue={searchValue} />,
      )}
    </>
  ) : (
    ''
  )
}

export default TaskItem

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  createTime: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  searchValue: PropTypes.string,
  subTasksWithSelectedLabels: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      taskId: PropTypes.string.isRequired,
    }),
  ),
}

TaskItem.defaultProps = {
  searchValue: '',
  subTasksWithSelectedLabels: [],
}
