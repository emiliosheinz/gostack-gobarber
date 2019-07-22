import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import { signInSuccess, signFailure } from './actions'

import history from '~/services/history'
import api from '~/services/api'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    if (!user.provider) {
      console.tron.error('Usuário não é um prestador de serviços')
      return
    }

    yield put(signInSuccess(token, user))

    history.push('/dashboard')
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados.')
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload

  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    })

    history.push('/')
  } catch (err) {
    toast.error('Falha no cadastro, verifique os seus dados.')

    yield put(signFailure())
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
])
