import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import PopularCard from './PopularCard';

export default function Popular() {

    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        GetBusinessList();
    }, [])

    const GetBusinessList = async () => {
        setBusinessList([])
        const q = query(collection(db, 'BusinessList'), limit(10))
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setBusinessList(prev => [...prev, {id: doc.id, ...doc.data()}])
        })
    }

    return (
        <View>
            <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // marginTop: 10
            }}>
                <Text style={{
                    fontFamily: 'merriweather',
                    fontSize: 16
                }}>Popular Business
                </Text>
                <Text style={{
                    fontFamily: 'merriweather',
                    color: '#A5C2AA'
                }}>View All</Text>
            </View>
            <FlatList
                data={businessList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ 
                    paddingLeft: 10, 
                    marginTop: -10
                }}
                renderItem={({ item, index }) => (
                    <PopularCard business={item} key={index} onBusiness={(business)=>console.log(business)}/>
                )} 
                />
        </View>
    )
}