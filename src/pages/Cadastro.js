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

export default function Cadastro({navigation}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirm, setSenhaConfirm] = useState('');

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

  async function handleCadastro() {
    await api
      .post('/authUser/', {
        name: nome,
        email: email,
        phone: telefone,
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
          <Text style={styles.inText}>
            {'<'}
          </Text>
          <Text style={styles.inText}>
            Criar conta
          </Text>

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Nome"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
          
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

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
            placeholder="Telefone"
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
          />

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha"
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
          />

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirme a senha"
            style={styles.input}
            value={senhaConfirm}
            onChangeText={setSenhaConfirm}
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={handleCadastro} style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
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
    height: '75%',
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
    borderRadius: 5,
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
    width: 120,
    height: 40,
    borderRadius: 5,
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
