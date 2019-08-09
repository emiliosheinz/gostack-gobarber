import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Background from '~/components/Background'

import { Container, Title, Form, FormInput, Separator } from './styles'

export default function Profile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const oldPasswordRef = useRef()
  const passwordConfirmationRef = useRef()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
        <Form>
          <FormInput
            icon='person-outline'
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Nome completo'
            returnKeyType='next'
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon='mail-outline'
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Digite o seu email'
            ref={emailRef}
            returnKeyType='next'
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Sua senha atual'
            ref={oldPasswordRef}
            returnKeyType='next'
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Sua nova senha'
            ref={passwordRef}
            returnKeyType='next'
            onSubmitEditing={() => passwordConfirmationRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Confirmação da nova senha'
            ref={passwordConfirmationRef}
            returnKeyType='send'
            onSubmitEditing={handleSubmit}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
          />

          <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>
        </Form>
      </Container>
    </Background>
  )
}

Profile.navigationOptions = {
  tabBarLabe: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name='person' size={20} color={tintColor} />
  ),
}
