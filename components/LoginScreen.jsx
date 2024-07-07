import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser"
import * as WebBrowser from "expo-web-browser"
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const [loading, setLoading] = useState()

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
    return (
        <View>
            <View >
                <Text style={{
                    fontFamily:'merriweather-bold',
                    fontSize: 70,
                    textAlign:'center',
                    marginTop: 100,
                    color: '#66F6AA'
                    }}>Bizz</Text>
            </View>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 15
            }} >
                <Image
                    source={{ uri: 'https://img.freepik.com/free-vector/mobile-ux-concept-illustration_114360-4276.jpg?w=740&t=st=1718984027~exp=1718984627~hmac=034e0425b4250598c6d2da1b4140abe4a8b7635911a2365389c88e0494ef46d7' }}
                    style={{
                        width: 300,
                        height: 300,
                        // borderRadius: 50
                    }}
                />
            </View>
            <View style={{
                    padding: 10
                    }}>
                <Text style={{
                    fontFamily:'merriweather',
                    fontSize: 20,
                    textAlign:'center',
                    marginTop: 10,
                    padding: 10
                    }}>Unlock
                    <Text style={{color: '#66F6AA', fontFamily:'merriweather-bold'}}> Endless Opportunities  </Text>
                    Your Ultimate Business Hub
                </Text>
                <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={{textAlign: 'center', fontFamily: 'merriweather'}}>Let's Get Started</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#66F6AA',
        padding: 16,
        borderRadius: 99,
        marginTop: 45,
    }
})

