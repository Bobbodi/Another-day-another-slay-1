import {StyleSheet, useColorScheme, View} from 'react-native';
import { Colors } from '../constants/Colors';

const ThemedCard = ({style, ...props}) => { 
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme ?? light];

    return (
        <View 
        style = {[{ backgroundColor: theme.backgroundColor}, 
            styles.card,
            style
        ]}
        {...props}
        />
    )
}