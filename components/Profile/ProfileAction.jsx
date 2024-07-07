import { View, Text, FlatList, TouchableOpacity, Image, Share, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import { useAuth } from '@clerk/clerk-expo'

export default function ProfileAction() {

    const r = useRouter()
    const {signOut} = useAuth()

    const profileAction = [
        {
            id: 1,
            name: 'Add Business',
            icon: 'https://cdn-icons-png.flaticon.com/128/3687/3687106.png',
            path: '/business/AddBusiness'
        },
        {
            id: 2,
            name: 'My Business',
            icon: 'https://cdn-icons-png.flaticon.com/128/2103/2103799.png',
            path: '/business/MyBusiness'
        },
        {
            id: 3,
            name: 'Favourites',
            icon: 'https://cdn-icons-png.flaticon.com/128/4472/4472856.png',
            path: '/business/Favourite'
        },
        {
            id: 4,
            name: 'Share App',
            icon: 'https://cdn-icons-png.flaticon.com/128/1828/1828874.png',
            path: 'share'
        },
        {
            id: 5,
            name: 'Logout',
            icon: 'https://cdn-icons-png.flaticon.com/128/4034/4034229.png',
            path: 'logout'
        },
        

    ]

    const Action = (i) => {
        if (i.path == 'logout') {
            Alert.alert(
                "Do you want to logout?",
                "Do you really want to logout?",
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Logout',
                        style: 'destructive',
                        onPress: () => signOut()
                    }
                ]
            ); 
        } else if (i.path == 'share') {
            Share.share({
                message: "Share Bizz with everyone" + "\nDownload URL: "
            });
        } else {
            r.push(i.path);
        }
    }

    return (
        <View>
            <FlatList
                data={profileAction}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} onPress={() => Action(item)}>
                        <View style={{
                            display: 'flex',
                            backgroundColor: 'white',
                            borderRadius: 15,
                            width: 70,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            borderWidth: 1,
                            borderColor: '#C8C8C8'
                        }}>
                            <Image source={{ uri: item?.icon }} style={{
                                width: 40,
                                height: 40,
                                margin: 10,
                            }} />
                        </View>
                        <Text style={{
                            fontFamily: 'merriweather-bold',
                            fontSize: 12,
                            textAlign: 'center',
                            marginTop: 4,
                            textAlign: 'center',
                            marginBottom: 4,
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )} />
            <Text style={{
                fontFamily: 'merriweather-bold',
                fontSize: 12,
                textAlign: 'center',
                marginTop: 100,
                textAlign: 'center',
                color: '#C8C8C8'
            }}>Developed By Aishwarya Vyas @2024</Text>
        </View>
    )
}