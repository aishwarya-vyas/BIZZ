import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessExplore from '../../components/Explore/BusinessExplore';
import { useUser } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';

export default function Explore() {

  const [businessList, setBusinessList] = useState([])
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState('')
  const { user } = useUser()

  const getBusinessCategory = async (category) => {
    setLoading(true)
    setBusinessList([])
    const q = query(collection(db, 'BusinessList'), where('category', '==', category))
    const querySnapshot = await getDocs(q)

    const businesses = []
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      businesses.push({ id: doc.id, ...doc.data() })
    })

    setBusinessList(businesses)
    setLoading(false)
  }

  const onSearch = async (text) => {
    setUserInput(text);
    setLoading(true);
    setBusinessList([]);
  
    if (text.length > 0) {
      const q = query(collection(db, 'BusinessList'), where('name', '>=', text), where('name', '<=', text + '\uf8ff'));
      const querySnapshot = await getDocs(q);
  
      const businesses = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        businesses.push({ id: doc.id, ...doc.data() });
      });
  
      setBusinessList(businesses);
    } else {
      setBusinessList([]);
    }
  
    setLoading(false);
  }
  

  return (
    <View style={{
      padding: 25
    }}>
      <Text style={{
        fontFamily: 'merriweather-bold',
        fontSize: 20,
        color: '#A5C2AA'
      }}>Explore More</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 99,
        marginTop: 15,
        marginVertical: 10,
        borderColor: '#C8C8C8',
        borderWidth: 1,
      }}>
        <Ionicons name="search" size={24} color="black" style={{
          color: '#A5C2AA'
        }} />
        <TextInput 
          placeholder='Search' 
          value={userInput}
          onChangeText={(value) => onSearch(value)}
          style={{
            flex: 1,
            color: '#A5C2AA',
            fontSize: 14,
            fontFamily: 'merriweather',
            paddingLeft: 10,
          }} 
        />
        {userInput.length > 0 && (
          <TouchableOpacity onPress={() => {setUserInput(''); onSearch('')}}>
            <MaterialIcons name="cancel" size={20} color="#C8C8C8" />
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50
        }}>
          <ActivityIndicator size="large" color="#A5C2AA" />
        </View>
      ) : (
        <>
          <Category 
            explore={true} 
            categorySelect={(category) => getBusinessCategory(category)} 
          />
          <BusinessExplore businessList={businessList} />
        </>
      )}
    </View>
  )
}
