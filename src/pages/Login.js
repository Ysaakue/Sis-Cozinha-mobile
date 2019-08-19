import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import api from '../services/api';

export default function Login({navigation}) {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        navigation.navigate('Cardapio', {token});
      }
    });
  }, [navigation]);

  async function salvar(valor) {
    await AsyncStorage.setItem('token', valor);
  }

  async function handlelogin() {
    await api
      .post('/authUser/login', {
        enrollment: matricula,
        password: senha,
      })
      .then(response => {
        const {token} = response.data;

        salvar(token);
        navigation.navigate('Cardapio', {token});
      })
      .catch(error => {
        console.log(error);
        alert('erro ao fazer login');
      });
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
      <ImageBackground
        source={require('../assets/background_login.jpeg')}
        style={styles.imageBackground}>
        <View style={styles.pinkBox}>
          <Text style={styles.inText}>SisCozinha</Text>

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Matricula"
            style={styles.input}
            value={matricula}
            onChangeText={setMatricula}
          />

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha"
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={handlelogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop: 15}}>
            <Text style={styles.linkCadastro}>Não é registrado ainda?</Text>
            <Text style={styles.linkCadastro}>Crie uma conta!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinkBox: {
    width: 290,
    height: 320,
    backgroundColor: '#F08080',
    alignItems: 'center',
    borderRadius: 8,
  },
  inText: {
    marginTop: 10,
    fontSize: 20,
    color: '#FFF',
  },
  input: {
    backgroundColor: '#FFF',
    width: 240,
    marginTop: 20,
    borderRadius: 5,
    height: 46,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 15,
  },
  boxBotoes: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    width: 240,
    height: 46,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 2.5,
  },
  buttonText: {
    color: '#2a2a2a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkCadastro: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ffffff',
  },
});
