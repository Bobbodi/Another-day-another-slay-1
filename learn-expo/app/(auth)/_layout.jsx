import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
    return (
        <>
            <StatusBar style="auto" />
            <Stack
                screenOptions={{
                    headerShown: true,
                    contentStyle: { backgroundColor: 'white' },
                }}
            />

            <Stack.Screen name = "(auth)" options = {{ headerShown: false }} />
        </>
    )
}

