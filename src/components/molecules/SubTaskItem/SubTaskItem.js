import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { onDeleteSubtaskAction } from 'actions'
import { Button } from 'components/atoms'
import { Wrapper, Title } from './SubTaskItem.styles'

const SubTaskItem = ({ title, id, taskId, searchValue }) => {
  const [showOnSearch, setShowOnSearch] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    !searchValue?.length || title.toLowerCase().match(searchValue.toLowerCase())
      ? setShowOnSearch(true)
      : setShowOnSearch(false)
  }, [searchValue, title])

  const deleteSubtask = useCallback(() => {
    dispatch(onDeleteSubtaskAction(id, taskId))
  }, [dispatch, id, taskId])

  return showOnSearch ? (
    <Wrapper>
      <Title>{title}</Title>
      <Button onClick={deleteSubtask} type="delete">
        Delete
      </Button>
    </Wrapper>
  ) : (
    ''
  )
}

export default SubTaskItem

SubTaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  searchValue: PropTypes.string,
}

SubTaskItem.defaultProps = {
  searchValue: '',
}
