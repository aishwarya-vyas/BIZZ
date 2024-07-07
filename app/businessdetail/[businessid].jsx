import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc, collection } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import Intro from '../../components/BusinessDetail/Intro'
import Action from '../../components/BusinessDetail/Action'
import About from '../../components/BusinessDetail/About'
import Review from '../../components/BusinessDetail/Review'

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBusiness = async () => {
      const docRef = doc(collection(db, 'BusinessList'), businessid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setBusiness({ id: docSnap.id, ...docSnap.data() })
      } else {
        console.log("No document found")
      }
      setLoading(false)
    }

    getBusiness()
  }, [businessid])

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={'#A5C2AA'} />
        </View>
      ) : (
        <FlatList
          data={[business]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Intro business={item} />
              <Action business={item} />
              <About business={item} />
              <Review business={item} setBusiness={setBusiness} />
            </View>
          )}
        />
      )}
    </View>
  )
}
