import React from 'react';
import { Image } from 'expo-image';
import { View, Pressable, ImageBackground, Text, SafeAreaView, StatusBar, Dimensions, Platform, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');

const login = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Login to your Account 
            </Text>
            
            <Pressable style = {({pressed}) => [styles.btn, pressed && styles.pressed]}
               >
                <Text style={{color: 'white'}}>Login</Text>
            </Pressable>

            <Link href="/register">
                <Text style={{textAlign: 'center'}}> Register instead </Text>
            </Link>

        </View>
    )
}

export default login;


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
  title: { 
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  }, 
  bodyText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  btn: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  
});
