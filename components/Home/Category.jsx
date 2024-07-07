import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router';

export default function Category({ explore = false, categorySelect }) {
    const [categoryList, setCategoryList] = useState([]);
    const r = useRouter();

    useEffect(() => {
        GetCategory();
    }, []);

    const GetCategory = async () => {
        setCategoryList([]);
        const q = query(collection(db, 'Category'));
        const querySnapshot = await getDocs(q);

        const CategoryData = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            CategoryData.push({ id: doc.id, ...doc.data() });
        });

        setCategoryList(CategoryData);
    };

    const catHandler = (c) =>{
        if(!explore){
            r.push('/businesslist/' + c.name)
        }
        else{
            categorySelect(c.name)
        }
    }

    return (
        <View>
            {!explore&& <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: -10
            }}>
                <Text style={{
                    fontFamily: 'merriweather',
                    fontSize: 18
                }}>Category
                </Text>
                <Text style={{
                    fontFamily: 'merriweather',
                    color: '#A5C2AA'
                }}>View All</Text>
            </View>}
            <FlatList
                style={{
                    marginLeft: 20
                }}
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CategoryItem category={item} onCat={(category)=>catHandler(category)} />
                )}
            />
        </View>
    )
}
