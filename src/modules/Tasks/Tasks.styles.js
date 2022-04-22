import styled from 'styled-components'

export const Wrapper = styled.div`
  text-align: center;
  margin: 20px 40px;
`

export const TaskWrapper = styled.div`
  margin-bottom: 20px;
`

export const FlexBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 40px 0 20px;
`

export const SortSection = styled.section`
  text-align: initial;
`

export const ButtonsSection = styled.section`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  font-size: 24px;
  font-weight: bold;
`

export const SortButtonsWrapper = styled(FlexBlock)`
  margin-top: 10px;
`

export const SelectSectionWrapper = styled.div`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  margin-top: 10px;
  align-self: center;
`

export const SearcSelectBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
