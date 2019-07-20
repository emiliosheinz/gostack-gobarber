import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from './styles'

export default function AuthLayout(props) {
  const { children } = props

  return <Wrapper>{children}</Wrapper>
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
}
