import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, query, setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../configs/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {

    const {user} = useUser()
    const n = useNavigation()
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [rating, setRating] = useState('')
    const [about, setAbout] = useState('')
    const [web, setWeb] = useState('')
    const [cat, setCat] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        n.setOptions({
            headerTitle: 'Add Business',
            headerShown: true
        })
        getCat();
    }, [])

    const imagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log(result);
        } else {
            console.log("Image picker was cancelled");
        }
    }

    const getCat = async () => {
        setLoading(true)
        const q = query(collection(db, 'Category'))
        const snapShot = await getDocs(q)
        const categories = snapShot.docs.map(doc => ({
            label: doc.data().name,
            value: doc.data().name
        }))
        setCategory(categories)
        setLoading(false)
    }

    const newBusiness = async (image) => {
        setLoading(true)
        const fileName = Date.now().toString() + ".jpg"
        const resp = await fetch(image)
        const blob = await resp.blob()
        const imageRef = ref(storage, 'business-app/' + fileName)

        uploadBytes(imageRef, blob).then((snapshot) => {
            console.log("File Uploaded")
        }).then(resp=>{
            getDownloadURL(imageRef).then(async(dr)=>{
                console.log(dr)
                saveDetail(dr)
            })
        })
    }

    const saveDetail = async(imageUrl)=>{
        await setDoc(doc(db, "BusinessList", Date.now().toString()), {
            name: name,
            address: address,
            contact: contact,
            rating: rating,
            about: about,
            category: cat,
            website: web,
            imageUrl: imageUrl,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName
          });
          ToastAndroid.show("Business Added",ToastAndroid.LONG)
          setLoading(false)
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{
                    fontFamily: 'merriweather-bold',
                    fontSize: 20
                }}>Add New Business</Text>
                <Text style={{
                    fontFamily: 'merriweather',
                    color: '#C8C8C8',
                    fontSize: 12,
                    marginTop: 10
                }}> Fill all details in order to add new business</Text>
                <TouchableOpacity onPress={imagePick} style={{ marginTop: 10 }}>
                    {!image ? (
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8344/8344913.png' }} style={{
                            width: 120,
                            height: 120,
                            borderRadius: 15
                        }} />
                    ) : (
                        <Image source={{ uri: image }} style={{
                            width: 120,
                            height: 120,
                            borderRadius: 15
                        }} />
                    )}
                </TouchableOpacity>
                <View>
                    <TextInput placeholder='Name' onChangeText={setName} style={{
                        padding: 10,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#C8C8C8',
                        borderRadius: 15,
                        fontFamily: 'merriweather'
                    }} />
                    <TextInput placeholder='Address' onChangeText={setAddress} style={{
                        padding: 10,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#C8C8C8',
                        borderRadius: 15,
                        fontFamily: 'merriweather'
                    }} />
                    <TextInput placeholder='Contact' onChangeText={setContact} style={{
                        padding: 10,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#C8C8C8',
                        borderRadius: 15,
                        fontFamily: 'merriweather'
                    }} />
                    <TextInput placeholder='Website' onChangeText={setWeb} style={{
                        padding: 10,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#C8C8C8',
                        borderRadius: 15,
                        fontFamily: 'merriweather'
                    }} />
                    <TextInput placeholder='Rating' onChangeText={setRating} style={{
                        padding: 10,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#C8C8C8',
                        borderRadius: 15,
                        fontFamily: 'merriweather'
                    }} />
                    <TextInput placeholder='About' onChangeText={setAbout} numberOfLines={4} style={{
                        padding: 10,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#C8C8C8',
                        borderRadius: 15,
                        justifyContent: 'flex-start',
                        textAlignVertical: 'top',
                        fontFamily: 'merriweather'
                    }} />
                </View>
                <View style={{
                    fontFamily: 'merriweather',
                    backgroundColor: 'white',
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: '#C8C8C8',
                    borderRadius: 15,
                    color: '#676767'
                }}>
                    <RNPickerSelect onValueChange={setCat} items={category} />
                </View>
                <TouchableOpacity
                    onPress={() => newBusiness(image)}
                    style={{
                        marginTop: 20,
                        padding: 10,
                        backgroundColor: '#A5C2AA',
                        borderRadius: 15,
                        alignItems: 'center'
                    }}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="white" />
                    ) : 
                    <Text style={{
                        fontFamily: 'merriweather-bold',
                        color: 'white',
                        fontSize: 16
                    }}>Add</Text>}
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}
