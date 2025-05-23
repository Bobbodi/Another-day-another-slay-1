import { SafeAreaView, View, type ViewProps, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const ThemedView = ({ style, safe = false, children, ...props }: ViewProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  if (safe) {
    return (
      <View 
        style={[{backgroundColor: theme.background}, 
        style]}
        {...props}
      >
      {children}
      </View>
    );
  } 

  const insets = useSafeAreaInsets(); 

  return (
    <SafeAreaView 
      style={[{backgroundColor: theme.background}, 
      style]}
      {...props}
    >
    {children}
    </SafeAreaView>
  )
  
}

export default ThemedView;

// export type ThemedViewProps = ViewProps & {
//   lightColor?: string;
//   darkColor?: string;
// };

// export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

//   return <View style={[{ backgroundColor }, style]} {...otherProps} />;
// }
