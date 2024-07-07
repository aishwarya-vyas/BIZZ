import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';

export default function User() {

    const { user } = useUser();

    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            marginTop: 80,
            gap: 10
        }}>
            <Image source={{ uri: user?.imageUrl }} style={{
                width: 100,
                height: 100,
                borderRadius: 99
            }} />
            <View>
                <Text style={{
                    fontFamily: 'merriweather-bold',
                    fontSize: 14,
                    textAlign: 'center'
                }}>{user?.fullName}</Text>
                <Text style={{
                    fontFamily: 'merriweather',
                    fontSize: 12,
                    textAlign: 'center'
                }}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
        </View>
    )
}