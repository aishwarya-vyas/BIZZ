import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import ExploreCard from '../../components/Explore/ExploreCard'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'

export default function Favourite() {

    const n = useNavigation()
    const [myFavourite, setMyFavourite] = useState([])
    const [loading,setLoading] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        n.setOptions({
            headerTitle: 'Favourites',
            headerShown: true,
        })
        GetFav()
    }, [])

    const GetFav = async () => {
        setLoading(true)
        setMyFavourite([])
        const q = query(collection(db, 'BusinessList'), where('favorites', 'array-contains', user?.primaryEmailAddress?.emailAddress))
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty){
            setLoading(false)
        }

        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setMyFavourite(prev => [...prev, { id: doc?.id, ...doc.data() }])
            setLoading(false)
        })
    }

    return (
        <View style={{
            padding: 15,
            flex: 1
        }}>
            <Text style={{
                fontFamily: 'merriweather-bold',
                fontSize: 20
            }}>Favourites</Text>
            {!loading ? <FlatList
                data={myFavourite}
                showsVerticalScrollIndicator={false}
                onRefresh={GetFav}
                refreshing={loading}
                renderItem={({ item, index }) => (
                    <ExploreCard business={item} key={index} />
                )}
            />
                :
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50
                }}>
                    <ActivityIndicator size="large" color="#A5C2AA" />
                </View>}
        </View>
    )
}
