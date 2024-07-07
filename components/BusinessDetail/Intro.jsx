import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';

export default function ExploreCard({ business }) {
  const r = useRouter();
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (business?.favorites && business.favorites.includes(user?.primaryEmailAddress?.emailAddress)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [business]);

  const toggleFavorite = async () => {
    if (!business?.id) {
      ToastAndroid.show('Business ID is missing', ToastAndroid.BOTTOM);
      return;
    }

    if (!user) {
      ToastAndroid.show('User data is missing', ToastAndroid.BOTTOM);
      return;
    }

    const docRef = doc(db, 'BusinessList', business.id);

    try {
      if (isFavorite) {
        await updateDoc(docRef, {
          favorites: arrayRemove(user?.primaryEmailAddress?.emailAddress)
        });
        setIsFavorite(false);
        ToastAndroid.show('Removed from favorites', ToastAndroid.SHORT);
      } else {
        await updateDoc(docRef, {
          favorites: arrayUnion(user?.primaryEmailAddress?.emailAddress)
        });
        setIsFavorite(true);
        ToastAndroid.show('Added to favorites', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      ToastAndroid.show('Failed to update favorite status', ToastAndroid.SHORT);
    }
  }

  const Delete = () => {
    Alert.alert("Do you want to delete?", "Do you really want to delete it?", [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteBusiness()
      }
    ]);
  }

  const deleteBusiness = async () => {
    console.log("Deleted");
    await deleteDoc(doc(db, "BusinessList", business?.id));
    r.back();
    ToastAndroid.show(`${business?.name} deleted`, ToastAndroid.LONG);
  }

  return (
    <View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'space-between',
        width: '170%',
        padding: 20
      }}>
        <TouchableOpacity onPress={() => r.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite}>
          <AntDesign name="heart" size={35} color={isFavorite ? '#E51227' : 'black'} />
        </TouchableOpacity>
        <View></View>
      </View>
      <Image source={{ uri: business?.imageUrl }} style={{ width: '100%', height: 350 }} />
      <View style={{
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#F2F2F2'
      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={{
            fontFamily: 'merriweather-bold',
            fontSize: 20,
          }}>{business?.name}</Text>
          {user?.primaryEmailAddress?.emailAddress == business?.userEmail && <TouchableOpacity onPress={Delete}>
            <Ionicons name="trash" size={24} color="#990000" />
          </TouchableOpacity>}
        </View>
        <Text style={{
          fontFamily: 'merriweather',
          fontSize: 12,
          paddingTop: 8
        }}>{business?.address}</Text>
      </View>
    </View>
  );
}
