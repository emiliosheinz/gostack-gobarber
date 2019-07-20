import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from './styles'

export default function DefaultLayout(props) {
  const { children } = props

  return <Wrapper>{children}</Wrapper>
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
}
