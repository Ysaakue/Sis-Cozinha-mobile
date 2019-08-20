import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

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

  async function handleLogin() {
    if (matricula.length >= 14) {
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
        .catch(() => {
          Alert.alert('Erro ao fazer login', 'Matricula ou senha inválidos!');
        });
    } else {
      Alert.alert('Matricula inválida', 'Informe uma matricula válida!');
    }
  }
  function handleCadastro() {
    navigation.navigate('Cadastro');
  }
  return (
    <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
      <ImageBackground
        source={require('../assets/background_login.jpeg')}
        style={styles.imageBackground}>
        <View style={styles.pinkBox}>
          <Text style={styles.inText}>Login</Text>

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

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCadastro} style={{marginTop: 15}}>
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
    elevation: 15,
  },
  inText: {
    marginTop: 10,
    fontSize: 30,
    color: '#FFF',
  },
  input: {
    backgroundColor: '#FFF',
    width: 240,
    marginTop: 20,
    borderRadius: 8,
    height: 40,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 15,
    color: '#121212',
  },
  boxBotoes: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    width: 120,
    height: 40,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 2.5,
  },
  buttonText: {
    color: '#666666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkCadastro: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ffffff',
  },
});
