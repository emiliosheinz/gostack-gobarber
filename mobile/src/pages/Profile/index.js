import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View } from 'react-native'

import Background from '~/components/Background'

// import { Container } from './styles';

export default function Profile() {
  return <Background />
}

Profile.navigationOptions = {
  tabBarLabe: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name='person' size={20} color={tintColor} />
  ),
}
