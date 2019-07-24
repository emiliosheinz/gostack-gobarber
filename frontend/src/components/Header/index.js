import React from 'react'
import { Link } from 'react-router-dom'

import Notifications from '~/components/Notifications'

import { Container, Content, Profile } from './styles'

import logo from '~/assets/logo_purple.svg'

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt='GoBarber logo' />
          <Link to='/dashboard'>DASHBOARD</Link>
        </nav>
        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>Emilio Heinzmann</strong>
              <Link to='/profile'>Meu perfil</Link>
            </div>
            <img
              src='https://api.adorable.io/avatars/50/abott@adorable.png'
              alt='Foto de perfil do usuário'
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
