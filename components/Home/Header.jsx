import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const { user } = useUser();
    return (
        <View style={{
            padding: 20,
            paddingTop: 40,
            backgroundColor: '#A5C2AA'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <Image source={{ uri: user?.imageUrl }} style={{
                    width: 45,
                    height: 45,
                    borderRadius: 99
                }} />
                <View>
                    <Text style={{
                        fontFamily: 'merriweather',
                        color: 'white'
                    }}>Welcome</Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'merriweather-bold',
                        color: 'white'
                    }}>{user?.fullName}</Text>
                </View>
            </View>
            <View>
                <Text style={{
                        fontSize: 30,
                        fontFamily: 'merriweather-italic',
                        color: 'white',
                        textAlign: 'center',
                        marginTop: 5,
                    }}>BIZZ <Text style={{
                        fontSize: 12,
                        fontFamily: 'merriweather-litalic',
                    }}>Ultimate Business Hub...</Text></Text>
            </View>
        </View>
    )
}
