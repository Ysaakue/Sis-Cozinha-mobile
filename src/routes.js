import { createStackNavigator } from 'react-navigation';

import Login from './pages/Login';

export default createStackNavigator({
    Login,
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#F08080",
        },
        headerTintColor: "#FFF",
    }
});