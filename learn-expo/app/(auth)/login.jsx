import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { useState } from 'react';

let counter = 0; 
const setCounter = () => {
    counter = counter + 1;
    console.log(counter);
    
}

const login = () => {
    return (
        <View style={styles.container}>

            <Text title = {true} style={styles.title}>
                Login to your Account 
                </Text>
            
            <Pressable style = {({pressed}) => [styles.btn, pressed && styles.pressed]}
                onPress = {setCounter}>
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
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'PixelifySans'
    },
    btn: { 
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        
    }, 
    pressed: {
        opacity: 0.75,
    },
})
