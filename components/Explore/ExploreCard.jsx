import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function ExploreCard({ business }) {

    const r = useRouter()

    return (
        <TouchableOpacity onPress={()=>r.push('/businessdetail/' + business?.id)} style={{
            backgroundColor: 'white',
            marginTop: 20,
            borderRadius: 15
        }}>
            <Image source={{ uri: business?.imageUrl }} style={{
                width: '100%',
                height: 150,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
            }} />
            <View style={{
                padding: 10
            }}>
                <Text style={{
                    fontFamily: 'merriweather-bold',
                    fontSize: 16,
                    color: '#A5C2AA'
                }} >{business?.name}</Text>
                <Text style={{
                    fontFamily: 'merriweather',
                    fontSize: 12
                }} >{business?.address}</Text>
            </View>
        </TouchableOpacity>
    )
}