import { View, Text, SafeAreaView} from 'react-native'
import React from 'react'
import User from '../../components/Profile/User'
import ProfileAction from '../../components/Profile/ProfileAction'

export default function profile() {
  return (
    <SafeAreaView style={{
      padding: 30,
    }}>
      <Text style={{
        fontFamily: 'merriweather-bold',
        fontSize: 20,
        color: '#A5C2AA'
      }}>Profile</Text>
      <User/>
      <ProfileAction/>
    </SafeAreaView>
  )
}