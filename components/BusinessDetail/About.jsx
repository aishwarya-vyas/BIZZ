import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        padding: 20
    }}>
      <Text style={{
        fontFamily: 'merriweather-bold',
        fontSize: 14
      }}>About</Text>
      <Text style={{
        fontFamily: 'merriweather',
        lineHeight: 20
      }}>{business?.about}</Text>
    </View>
  )
}