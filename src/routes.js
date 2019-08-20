import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Cardapio from './pages/Cardapio';
import Cadastro from './pages/Cadastro';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Cardapio,
        Cadastro,
    })
);