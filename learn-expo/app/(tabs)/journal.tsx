import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ThemedView from '@/components/ThemedView';

const Journal = () => {

    const colorScheme = useColorScheme();
      const theme = Colors[colorScheme ?? 'light'];

    return (
        <ThemedView style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={styles.header}>Journal</Text>
        <Text style={styles.text}>
            This is a simple journal app built with React Native and Expo. It allows users to create,
            read, update, and delete journal entries.
        </Text>
        <Text style={styles.text}>
            The app uses Supabase as the backend for authentication and data storage.
        </Text>

        <Link href="/"> Home Screen </Link>
        </ThemedView>
    );
}
export default Journal;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
});
