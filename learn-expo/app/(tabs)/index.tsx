import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Pressable} from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '@/components/ThemedView';
import Spacer from '@/components/Spacer';
import { ThemedText } from '@/components/ThemedText';
import { addWhitelistedNativeProps } from 'react-native-reanimated/lib/typescript/ConfigHelper';

const HomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/dark-background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.header}>SlayFocus</Text>
        <Spacer />
        <Text style={styles.text}>Become an Academic Weapon</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Button Pressed');
          }}
          style={styles.button}
        >
        
        </TouchableOpacity>
        
          <ThemedText style={styles.card}>

        
              <Link href="../login"> Login Page </Link>
            

          </ThemedText>
          <ThemedText style={styles.card}>

        
              <Link href="../register"> Register Page </Link>
            

          </ThemedText>
          <ThemedText style={styles.card}>

        
              <Link href="../profile"> Profile Page </Link>
            

          </ThemedText>

          
        
      </ImageBackground>
    </ThemedView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    fontFamily: 'PixelifySans',
    color: 'white',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'PixelifySans',
  }, 
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }, 
  pressed: {
    opacity: 0.7,
  },
   
  card: { 
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    elevation: 5,
    fontFamily: 'PixelifySans',
    fontSize: 20,
  }
});


// /</Text></ThemedLogo><Image source={require('@/assets/images/bread.jpg')}
// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
