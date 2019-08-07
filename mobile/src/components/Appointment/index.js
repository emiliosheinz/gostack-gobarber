import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, Left, Avatar, Info, Name, Time } from './styles'

export default function Appointment() {
  return (
    <Container>
      <Left>
        <Avatar
          source={{ uri: 'https://api.adorable.io/avatar/50/rockeseat.png' }}
        />
        <Info>
          <Name>Emilio Heinzmann</Name>
          <Time>Em 4 horas</Time>
        </Info>
      </Left>
      <TouchableOpacity onPress={() => {}}>
        <Icon name='event-busy' size={20} color='#f64c65' />
      </TouchableOpacity>
    </Container>
  )
}
