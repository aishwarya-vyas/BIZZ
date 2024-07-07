import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from './../components/LoginScreen'
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


export default function RootLayout() {
  const [loaded] = useFonts({
    'merriweather': require('./../assets/fonts/Merriweather-Regular.ttf'),
    'merriweather-bold': require('./../assets/fonts/Merriweather-Bold.ttf'),
    'merriweather-black': require('./../assets/fonts/Merriweather-Black.ttf'),
    'merriweather-litalic': require('./../assets/fonts/Merriweather-LightItalic.ttf'),
    'merriweather-italic': require('./../assets/fonts/Merriweather-Italic.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen></LoginScreen>
      </SignedOut>
    </ClerkProvider>

  );
}
