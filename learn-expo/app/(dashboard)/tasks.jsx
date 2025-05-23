import { StyleSheet, Text, View } from "react-native";


const Tasks = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create</Text>
        </View>
    )
}

export default Tasks;

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
