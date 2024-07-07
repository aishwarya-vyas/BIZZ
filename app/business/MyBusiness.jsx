import { View, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import ExploreCard from '../../components/Explore/ExploreCard'
import BusinessCard from '../../components/BusinessList/BusinessCard'

export default function MyBusiness() {

    const n = useNavigation()
    const { user } = useUser()
    const [myBusiness, setMyBusiness] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        n.setOptions({
            headerTitle: 'My Business',
            headerShown: true,
        })
        user && GetUser()
    }, [user])

    const GetUser = async () => {
        setLoading(true)
        setMyBusiness([])
        const q = query(collection(db, 'BusinessList'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress))
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty){
            setLoading(false)
        }

        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setMyBusiness(prev => [...prev, { id: doc?.id, ...doc.data() }])
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
            }}>My Business</Text>
            {!loading ? <FlatList
                showsVerticalScrollIndicator={false}
                data={myBusiness}
                onRefresh={GetUser}
                refreshing={loading}
                renderItem={({ item, index }) => (
                    <BusinessCard business={item} key={index} />
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