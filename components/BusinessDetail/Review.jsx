import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import { doc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

export default function Review({ business, setBusiness }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState('');
  const { user } = useUser();

  const onSubmit = async () => {
    if (!business?.id) {
      ToastAndroid.show('Business ID is missing', ToastAndroid.BOTTOM);
      return;
    }

    if (!user) {
      ToastAndroid.show('User data is missing', ToastAndroid.BOTTOM);
      return;
    }

    const newReview = {
      rating: rating,
      comment: userInput,
      userName: user?.fullName || 'Anonymous',
      userImage: user?.imageUrl || '',
      userEmail: user?.primaryEmailAddress?.emailAddress || ''
    };

    const docRef = doc(db, 'BusinessList', business.id);

    try {
      await updateDoc(docRef, {
        reviews: arrayUnion(newReview)
      });
      ToastAndroid.show('Comment Added Successfully!', ToastAndroid.BOTTOM);
      setUserInput('');
      setBusiness(prev => ({
        ...prev,
        reviews: [...(prev.reviews || []), newReview]
      }));
    } catch (error) {
      console.error('Error adding document: ', error);
      ToastAndroid.show('Failed to add comment', ToastAndroid.BOTTOM);
    }
  };

  const deleteReview = async (review) => {
    if (!business?.id) {
      ToastAndroid.show('Business ID is missing', ToastAndroid.BOTTOM);
      return;
    }

    const docRef = doc(db, 'BusinessList', business?.id);

    try {
      await updateDoc(docRef, {
        reviews: arrayRemove(review)
      });
      setBusiness(prev => ({
        ...prev,
        reviews: prev.reviews.filter(item => item !== review)
      }));
      ToastAndroid.show('Review deleted successfully!', ToastAndroid.BOTTOM);
    } catch (error) {
      console.error('Error deleting review: ', error);
      ToastAndroid.show('Failed to delete review', ToastAndroid.BOTTOM);
    }
  };

  const confirmDelete = (review) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteReview(review) }
      ]
    );
  };

  return (
    <View style={{ padding: 20, marginTop: -20 }}>
      <Text style={{ fontFamily: 'merriweather-bold', fontSize: 14 }}>Reviews</Text>
      <View>
        <Rating
          imageSize={20}
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10, color: '#F2F2F2' }}
        />
        <TextInput
          placeholder='Write your review'
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
          numberOfLines={4}
          style={{
            borderWidth: 1.5,
            padding: 10,
            borderColor: '#C8C8C8',
            borderRadius: 10,
            justifyContent: 'flex-start',
            textAlignVertical: 'top'
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={onSubmit}
          style={{ padding: 2, marginTop: 10 }}
        >
          <Text style={{
            fontFamily: 'merriweather',
            fontSize: 12,
            backgroundColor: '#A5C2AA',
            borderRadius: 10,
            color: 'white',
            padding: 8,
            textAlign: 'center'
          }}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View>
        {business?.reviews?.map((item, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: '#C8C8C8',
            borderRadius: 15,
            marginTop: 10
          }}>
            <Image source={{ uri: item.userImage }} style={{
              width: 50,
              height: 50,
              borderRadius: 99
            }} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ fontFamily: 'merriweather-bold', fontSize: 12 }}>{item.userName}</Text>
              {user?.primaryEmailAddress?.emailAddress === item.userEmail && (
                <TouchableOpacity onPress={() => confirmDelete(item)} style={{ position: 'absolute', right: 10 }}>
                  <Ionicons name="trash" size={24} color="#990000" />
                </TouchableOpacity>
              )}
              <Rating
                imageSize={20}
                showRating={false}
                startingValue={item.rating}
                style={{
                    marginRight: 150,
                    marginTop: 4
                }}
              />
              <Text style={{ fontFamily: 'merriweather', fontSize: 12, marginTop: 4}}>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
