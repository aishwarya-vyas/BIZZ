import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'

export default function Action({ business }) {

    const Action = (i)=>{
        if(i.name == 'Share'){
            Share.share({
                message:business?.name + "\nAddress: "+business?.address + "\nFor more details go to Bizz!"
            })
            return;
        }
        Linking.openURL(i.url)
    }

    const actionMenu = [
        {
            id: 1,
            name: 'Call',
            icon: 'https://cdn-icons-png.flaticon.com/128/5585/5585856.png',
            url: 'tel:' + business?.contact
        },
        {
            id: 2,
            name: 'Location',
            icon: 'https://cdn-icons-png.flaticon.com/128/2991/2991231.png',
            url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address
        },
        {
            id: 3,
            name: 'Web',
            icon: 'https://cdn-icons-png.flaticon.com/128/10453/10453141.png',
            url: business?.website
        },
        {
            id: 4,
            name: 'Share',
            icon: 'https://cdn-icons-png.flaticon.com/128/16206/16206677.png',
            url: ''
        }
    ]

    return (
        <View style={{
            padding: 10
        }}>
            <FlatList
                data={actionMenu}
                numColumns={4}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} onPress={()=>Action(item)}>
                        <Image source={{ uri: item?.icon }} style={{
                            width: 40,
                            height: 40,
                            margin: 10,

                        }} />
                        <Text style={{
                            fontFamily: 'merriweather-bold',
                            fontSize: 12,
                            textAlign: 'center',
                            marginTop: 4
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )} />
        </View>
    )
}