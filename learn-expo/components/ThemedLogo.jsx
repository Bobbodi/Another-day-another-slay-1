import {Image} from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

import logoLight from '../assets/images/bread.jpg';
import logoDark from '../assets/images/bread-dark.jpg';

const ThemedLogo = () => { 
    const colorScheme = useColorScheme()
    const logo = colorScheme === 'dark' ? logoDark : logoLight;

    return (
        <Image source = {logo}
        style={{width: 140, height: 140, borderRadius: 10}}/>
    )

}

export default ThemedLogo;