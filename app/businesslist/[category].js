import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import BusinessCard from '../../components/BusinessList/BusinessCard'

export default function BusinessCategory() {
    const [businessCategory, setBusinessCategory] = useState([]);
    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        });
        GetBusinessCategory();
    }, [category]);

    const GetBusinessCategory = async () => {
        setLoading(true);
        const q = query(collection(db, 'BusinessList'), where('category', '==', category));
        const querySnapshot = await getDocs(q);

        const businessData = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            businessData.push({ id: doc?.id, ...doc.data() });
        });

        setBusinessCategory(businessData);
        setLoading(false);
    };

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" color="#A5C2AA" />
                </View>
            ) : businessCategory.length > 0 ? (
                <FlatList
                    onRefresh={GetBusinessCategory}
                    refreshing={loading}
                    data={businessCategory}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <BusinessCard business={item} />
                    )}
                />
            ) : (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: 'merriweather-bold',
                        fontSize: 20,
                        color: '#C8C8C8'
                    }}>No Business Found</Text>
                </View>
            )}
        </View>
    );
}
