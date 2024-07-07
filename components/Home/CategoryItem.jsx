import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CategoryItem({ category, onCat}) {
    return (
        <TouchableOpacity onPress={()=>onCat(category)}>
            <View style={{
                padding: 15,
                backgroundColor: '#F5F5F5',
                borderRadius: 99,
                marginRight: 10,
                marginTop: -15 
            }}>
                <Image source={{ uri: category.icon }} style={{
                    width: 40,
                    height: 40,
                    color: '#A5C2AA'
                }} />
            </View>
            <Text style={{
                fontFamily: 'merriweather',
                fontSize: 12,
                textAlign: 'center'
                }}>{category.name}</Text>
        </TouchableOpacity>
    )
}