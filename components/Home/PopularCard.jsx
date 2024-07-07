import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PopularCard({ business, onBusiness }) {

    const r = useRouter()

    return (
        <TouchableOpacity onPress={() => r.push('/businessdetail/'+business?.id)}>
            <View style={{
                padding: 8,
                backgroundColor: '#FFF',
                borderRadius: 8,
                marginLeft: 10,
            }}>
                <Image source={{ uri: business.imageUrl }} style={{
                    width: 200,
                    height: 120,
                    borderRadius: 15
                }} />
                <View>
                    <Text style={{
                        fontFamily: 'merriweather-bold',
                        fontSize: 12,
                        marginTop: 5
                    }}>{business.name}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{
                        width: 200,
                        flexWrap: 'wrap',
                        fontFamily: 'merriweather',
                        marginTop: 4,
                        fontSize: 10,
                        color: '#A5C2AA'
                    }}>{business.address}</Text>
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
                            <Ionicons name="star" size={15} color="#E5B80B" />
                            <Text style={{
                                fontFamily: 'merriweather',
                                fontSize: 10,
                            }}>{business.rating}</Text>
                        </View>
                        <Text style={{
                            fontFamily: 'merriweather',
                            fontSize: 10,
                            backgroundColor: '#A5C2AA',
                            borderRadius: 10,
                            color: 'white',
                            padding: 4
                        }}>{business.category}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}