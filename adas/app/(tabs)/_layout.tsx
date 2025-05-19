import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Component that renders the tab bar background image
// export const TBarBackground = () => {
//   // iOS uses a BlurView with the image for a nicer effect
//   if (Platform.OS === 'ios') {
//     return (
//       <View style={styles.container}>
//         <ImageBackground 
//           source={require('@/assets/images/grass-background-2.jpg')} 
//           style={styles.imageBackground}
//           resizeMode="cover"
//         >
//           <BlurView intensity={10} style={StyleSheet.absoluteFill} />
//         </ImageBackground>
//       </View>
//     );
//   }
  
//   // Android and other platforms just use the image directly
//   return (
//     <Image
//       source={require('@/assets/images/nav-bar-background.png')}
//       style={styles.imageBackground}
//       resizeMode="cover"
//     />
//   );
// };


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
          
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'friends',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.and.pencil" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});