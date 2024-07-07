import { View, ScrollView, RefreshControl, Text } from 'react-native';
import React, { useState, useCallback } from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import Category from '../../components/Home/Category';
import Popular from '../../components/Home/Popular';

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setKey(prevKey => prevKey + 1);
    }, 2000);
  }, []);

  return (
    <ScrollView
      key={key}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header key={`header-${key}`} />
      <Slider key={`slider-${key}`} />
      <Category key={`category-${key}`} />
      <Popular key={`popular-${key}`} />
      <View style={{ height: 10 }}></View>
    </ScrollView>
  );
}
