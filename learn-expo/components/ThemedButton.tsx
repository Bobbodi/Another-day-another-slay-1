
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { Colors } from '@/constants/Colors';
import { processColorsInProps } from 'react-native-reanimated/lib/typescript/Colors';

import { useState } from 'react';
import { ViewProps } from 'react-native';
let counter = 0; 
const setCounter = () => {
    counter = counter + 1;
    console.log(counter);
    
}

function ThemedButton({style, ...props}:ViewProps) { 
    return (
         <Pressable style = {({pressed}) => [styles.btn, pressed && styles.pressed]}
                onPress = {setCounter}>
                <Text style={{color: 'white'}}>Login</Text>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
