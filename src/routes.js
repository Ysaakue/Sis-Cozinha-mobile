import {createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Login from './pages/Login';
import SelecaoDias from './pages/SelecaoDias';
import Cadastro from './pages/Cadastro';
import SelecaoRefeicao from './pages/SelecaoRefeicao'

const logado = createStackNavigator({
  SelecaoDias,
  SelecaoRefeicao,
})

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Cadastro,
    logado,
  }),
);
