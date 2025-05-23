
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const DashboardLayout = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.background,
                    borderTopColor: theme.borderColor,
                    borderTopWidth: 1,
                    height: 70,
                },
                tabBarActiveTintColor: theme.tabIconSelected,
                tabBarInactiveTintColor: theme.tabIconDefault,
            }}
        >
            <Tabs.Screen
                name="journal"
                options={{
                    title: "Journal",
                    tabBarIcon: ({ focused }) => ( //focused is T/F
                        <Ionicons 
                            name={focused ? "journal-sharp" : "journal-outline"}
                            size={24}
                            color={theme.tabIconDefault} />
                    )
                }}
            />

            <Tabs.Screen
                name="friends"
                options={{
                    title: "Friends",
                    tabBarIcon: ({ focused }) => ( //focused is T/F
                        <Ionicons 
                            name={focused ? "people-sharp" : "people-outline"}
                            size={24}
                            color={theme.tabIconDefault} />
                    )
                }}
            />

            <Tabs.Screen
                name="tasks"
                options={{
                    title: "Tasks",
                    tabBarIcon: ({ focused }) => ( //focused is T/F
                        <Ionicons 
                            name={focused ? "list-sharp" : "list-outline"}
                            size={24}
                            color={theme.tabIconDefault} />
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => ( //focused is T/F
                        <Ionicons 
                            name={focused ? "person" : "person-outline"}
                            size={24}
                            color={theme.tabIconDefault} />
                    )
                }}
            />

        </Tabs>
    );
};

export default DashboardLayout;