import { Slot, Stack } from 'expo-router';
import { StackRouter } from 'expo-router/build/layouts/StackClient';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { RealmProvider } from '@realm/react';

const RootLayout = () => {

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [loaded] = useFonts({
     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
     PixelifySans: require('../assets/fonts/PixelifySans-Regular.ttf'),
     PixelifySansSemiBold: require('../assets/fonts/PixelifySans-SemiBold.ttf'),
   });

  return (
    <>
      <RealmProvider schema ={[]}>
        <Stack></Stack>
      </RealmProvider>

      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <Stack screenOptions={{
        headerStyle: { backgroundColor: theme.background},
        headerTintColor: theme.tint,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name="(tabs)" options={{title: 'Home'}}/>
        <Stack.Screen name="(auth)" options={{title: 'Login'}}/>
        <Stack.Screen name="(dashboard)" options={{title: 'Board'}}/>
        
      </Stack>
    </>
  )
}

export default RootLayout;

// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     PixelifySans: require('../assets/fonts/PixelifySans-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
