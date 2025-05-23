import { StyleSheet, Text, View } from "react-native";


const Create = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create</Text>
        </View>
    )
}

export default Create;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: { 
        fontFamily: 'PixelifySans'
    }
})
