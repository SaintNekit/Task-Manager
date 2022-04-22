import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Button, Input, Select } from 'components/atoms'
import { TaskItem } from 'components/organisms'
import { onTaskCreateAction, onFetchTasksAction, sortAction } from 'actions'
import {
  Wrapper,
  TaskWrapper,
  FlexBlock,
  SortSection,
  ButtonsSection,
  Label,
  SortButtonsWrapper,
  SelectSectionWrapper,
  SearcSelectBlock,
} from './Tasks.styles'

const Tasks = () => {
  const [searchValue, setSearchValue] = useState('')
  const [labelOptions, setLabelsOptions] = useState([])
  const [subTasksWithSelectedLabels, setSubTasksWithSelectedLabels] = useState([])
  const [dropSelection, setDropSelection] = useState(false)
  const dispatch = useDispatch()
  const tasksList = useSelector(({ reducers: { tasks } }) => tasks)
  const subTasksList = useSelector(({ reducers: { subTasks } }) => subTasks)

  useEffect(() => {
    if (subTasksList?.length) {
      subTasksList.forEach(task =>
        setLabelsOptions(labels => [...new Set([...labels, ...task.labels])]),
      )
    } else {
      setLabelsOptions([])
    }
  }, [subTasksList])

  useEffect(() => {
    if (dropSelection) {
      setSubTasksWithSelectedLabels([])
      setDropSelection(false)
    }
  }, [dropSelection])

  const createTask = useCallback(() => {
    dispatch(onTaskCreateAction())
  }, [dispatch])

  const getTaskList = useCallback(() => {
    dispatch(onFetchTasksAction())
  }, [dispatch])

  const sortByTitle = useCallback(() => {
    dispatch(sortAction('title'))
  }, [dispatch])

  const sortByDate = useCallback(() => {
    dispatch(sortAction('date'))
  }, [dispatch])

  const handleSelectValues = useCallback(
    event => {
      const options = event.target.selectedOptions
      const selectedValues = Array.from(options, option => option.value)
      const subTasksWithSelectedValue = subTasksList.filter(
        ({ labels }) => _.intersection(labels, selectedValues).length,
      )

      setSubTasksWithSelectedLabels(subTasksWithSelectedValue)
    },
    [subTasksList],
  )

  return (
    <Wrapper>
      <h1>Tasks</h1>
      <FlexBlock>
        <SortSection>
          <Label>Sort by:</Label>
          <SortButtonsWrapper>
            <Button onClick={sortByTitle} sort="title">
              Title
            </Button>
            <Button onClick={sortByDate} sort="date">
              Date
            </Button>
          </SortButtonsWrapper>
        </SortSection>
        <SearcSelectBlock>
          <Input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search..."
          />
          <SelectSectionWrapper show={labelOptions?.length}>
            <Select multiple onChange={handleSelectValues}>
              {labelOptions.map(label => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </Select>
          </SelectSectionWrapper>
        </SearcSelectBlock>
        <ButtonsSection>
          <Button onClick={createTask} add="create">
            Create Task
          </Button>
          <Button onClick={getTaskList} add="show">
            Show Task List
          </Button>
          <Button onClick={() => setDropSelection(true)} show={labelOptions?.length} type="drop">
            Drop Selected Values
          </Button>
        </ButtonsSection>
      </FlexBlock>
      {tasksList.map(task => (
        <TaskWrapper key={task.id}>
          <TaskItem
            {...task}
            searchValue={searchValue}
            subTasksWithSelectedLabels={subTasksWithSelectedLabels}
          />
        </TaskWrapper>
      ))}
    </Wrapper>
  )
}

export default Tasks
