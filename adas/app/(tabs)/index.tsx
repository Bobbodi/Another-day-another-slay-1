import React from 'react';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { View, TouchableOpacity, ImageBackground, Text, SafeAreaView, StatusBar, Dimensions, Platform, StyleSheet } from 'react-native';
import { Link } from 'expo-router';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Tabs, useNavigation } from 'expo-router';

const { widtcd ah, height } = Dimensions.get('window');
const Home = () => {
  const router = useRouter();
  const navigateToTasks = () => {
    router.navigate('/(tabs)/tasks');
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('@/assets/images/blue-background.jpg')}
        // Alternatively, use a URL:
        // source={{uri: 'https://example.com/your-image.jpg'}}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.contentContainer}>

          <Text style={styles.bodyText}>
            Your Academic Weapon comeback! 
          </Text>


          <Image 
            source={require('@/assets/images/slayfocus-logo.png')}
            style={styles.logo}
          />

          <TouchableOpacity onPress={navigateToTasks}>
          <Image
            source={require('@/assets/images/start-button.png')}
            style={styles.startbutton}
          />
          </TouchableOpacity>


          <Link href="../register"> Register Page </Link>
        
        </SafeAreaView>

        
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  
  container: { 
    flex: 1,
  }, 
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }, // Semi-transparent background
  headerText: { 
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  }, 
  bodyText: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: 'PixelifySans',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  startbutton: {
    height: 100,
    width: 240,
    bottom: 70,
    left: 0,
    position: 'fixed',
  },
  logo: {
    width: 200, 
    height: 250,
    display: 'flex', 
    alignItems: 'center', 
    marginTop: 30,
    marginBottom: 100,
    
  },
});

export default Home;

/* <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/blue-background.jpg')}
          style={styles.reactLogo}
        />
      }>
      
      <ImageBackground source={require('@/assets/images/blue-background.jpg')} resizeMode="cover" style={styles.image}>
        {/* <Text style={styles.text}>Inside</Text>}
      </ImageBackground>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">SlayFocus!</ThemedText>
        {/* <HelloWave />}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView> */