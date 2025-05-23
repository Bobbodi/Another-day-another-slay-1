import { StyleSheet, Text, View } from "react-native";


const Profile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile</Text>
        </View>
    )
}

export default Profile;

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
