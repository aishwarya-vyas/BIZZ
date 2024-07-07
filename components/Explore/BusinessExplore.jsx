import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ExploreCard from './ExploreCard'

export default function BusinessExplore({ businessList }) {
    return (
        <FlatList
            data={businessList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <View>
                    <ExploreCard
                        business={item}
                        key={index}
                    />
                </View>
            )}
            keyExtractor={(item, index) => index.toString()} 
        />
    )
}
