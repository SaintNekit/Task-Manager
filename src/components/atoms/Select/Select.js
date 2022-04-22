import React from 'react'
import PropTypes from 'prop-types'
import { StyledSelect } from './Select.styles'

const Select = ({ children, ...props }) => <StyledSelect {...props}>{children}</StyledSelect>

export default Select

Select.propTypes = {
  children: PropTypes.node,
}

Select.defaultProps = {
  children: '',
}
