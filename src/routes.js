import { createStackNavigator } from 'react-navigation';

import Main from './pages/Login';

export default createStackNavigator({
    Main,
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#F08080",
        },
        headerTintColor: "#FFF",
    }
});