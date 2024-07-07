import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        GetSlider();
    }, []);

    const GetSlider = async () => {
        setSliderList([]);
        const q = query(collection(db, 'Slider'));
        const querySnapshot = await getDocs(q);
 
        const sliderData = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            sliderData.push(doc.data());
        });

        setSliderList(sliderData);
    };

    return (
        <View>
            <Text style={{
                fontFamily: 'merriweather-bold',
                fontSize: 16,
                padding: 15
            }}>
                #Special for you
            </Text>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 20 }}
                renderItem={({item, index }) => (
                    <Image 
                        source={{ uri: item.imageUrl }}
                        style={{
                            width: 300,
                            height: 150 ,
                            marginRight: 15,
                            borderRadius: 15,
                        }}
                    />
                )}
            />
        </View>
    )
}
