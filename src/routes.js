import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Cardapio from './pages/Cardapio';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Cardapio,
    })
);