import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BusinessCard({ business }) {

    const r = useRouter()

    return (
        <TouchableOpacity style={{
            padding: 8,
            backgroundColor: '#FFF',
            borderRadius: 8,
            marginBottom: 10,
            margin: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 10
        }}
            onPress={() =>r.push('/businessdetail/'+business?.id)}
        >
            <Image source={{ uri: business?.imageUrl }} style={{
                width: 120,
                height: 120,
                borderRadius: 15
            }} />
            <View style={{
                marginTop: 10
            }}>
                <Text style={{
                    fontFamily: 'merriweather-bold',
                    fontSize: 14,
                    marginTop: 5
                }}>{business?.name}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{
                    width: 200,
                    flexWrap: 'wrap',
                    fontFamily: 'merriweather',
                    marginTop: 4,
                    fontSize: 12,
                    color: '#A5C2AA'
                }}>{business?.address}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 4
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 8,
                        marginTop: 4
                    }}>
                        <Ionicons name="star" size={18} color="#E5B80B" />
                        <Text style={{
                            fontFamily: 'merriweather',
                            fontSize: 12,
                        }}>{business?.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}