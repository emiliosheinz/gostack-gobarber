import React from 'react'

import Input from '~/components/Input'

import Background from '~/components/Background'

export default function SignIn() {
  return (
    <Background>
      <Input icon='call' placeholder='Digite seu nome' />
    </Background>
  )
}
