import React from 'react';
import { Image } from 'expo-image';
import { View, ImageBackground, Text, SafeAreaView, StatusBar, Dimensions, Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');


const App = () => {
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
          <Text style={styles.headerText}>Tasks</Text>
          <Text style={styles.bodyText}>
            Under construction! 
          </Text>
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
});

export default App;

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

    // import { MongoClient } from "mongodb";

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://mannysally000:AnotherDayAnotherSlay@bob0.ezj6avw.mongodb.net/?retryWrites=true&w=majority&appName=Bob0";


// // Create a new client and connect to MongoDB
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     // Connect to the "sample_mflix" database and access its "movies" collection
//     const database = client.db("sample_mflix");
//     const movies = database.collection("movies");
    
//     // Create a document to insert
//     const doc = {
//       title: "Charade",
//       genres: ["Comedy", "Romance", "Thriller"],
//       year: 1963,
//       cast: ["Cary Grant", "Audrey Hepburn", "Walter Matthau"],
//     }
//     // Insert the defined document into the "movies" collection
//     const result = await movies.insertOne(doc);

//     // Print the ID of the inserted document
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//      // Close the MongoDB client connection
//     await client.close();
//   }
// }
// // Run the function and handle any errors
// run().catch(console.dir);




