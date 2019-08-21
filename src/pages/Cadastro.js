import React, {useState, useEffect, Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';
import {
  ScrollView,
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
import api from '../services/api';

export default class Cadastro extends Component {
  state = {
    nome: '',
    email: '',
    matricula: '',
    telefone: '',
    senha: '',
    senhaConfirm: '',
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        this.props.navigation.navigate('Cardapio', {token});
      }
    });
  }

  salvar = async (valor) => {
    await AsyncStorage.setItem('token', valor);
  }

  handleLogin = () => {
    this.props.navigation.navigate('Login');
  }

  autoLogin = async () => {
    await api
      .post('/authUser/login', {
        enrollment: this.state.matricula,
        password: this.state.senha,
      })
      .then(response => {
        const {token} = response.data;
        this.salvar(token);
        this.props.navigation.navigate('Cardapio', {token});
      })
      .catch(() => {
        Alert.alert('Erro ao fazer login');
      });
  }

  handleCadastro = async () => {
    await api
      .post('/authUser/', {
        name: this.state.nome,
        email: this.state.email,
        phone: this.state.telefone,
        enrollment: this.state.matricula,
        password: this.state.senha,
      })
      .then(() => {
        autoLogin();
      })
      .catch(() => {
        Alert.alert('Erro ao criar conta');
      });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
        <ImageBackground
          source={require('../assets/background_login.jpeg')}
          style={styles.imageBackground}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <View style={styles.pinkBox}>
              <Text style={styles.inText}>Criar conta</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Nome"
                style={styles.input}
                value={this.state.nome}
                onChangeText={(text) => this.setState({nome: text})}
              />

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                style={styles.input}
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
              />

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Matricula"
                style={styles.input}
                value={this.state.matricula}
                onChangeText={(text) => this.setState({matricula: text})}
              />

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Telefone"
                style={styles.input}
                value={this.state.telefone}
                onChangeText={(text) => this.setState({telefone: text})}
              />

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Senha"
                style={styles.input}
                secureTextEntry={true}
                value={this.state.senha}
                onChangeText={(text) => this.setState({senha: text})}
              />

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Confirme a senha"
                style={styles.input}
                secureTextEntry={true}
                value={this.state.senhaConfirm}
                onChangeText={(text) => this.setState({senhaConfirm: text})}
              />

              <TouchableOpacity onPress={this.handleCadastro} style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}
                style={{marginTop: 10}}
              >
                <Text style={styles.linkLogin}>Já é registrado?</Text>
                <Text style={styles.linkLogin}>Fazer Login!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
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
    height: 535,
    backgroundColor: '#F08080',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 15,
  },
  inText: {
    marginTop: 10,
    fontSize: 30,
    color: '#FFF',
    marginLeft: 10,
    marginRight: 10,
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
    width: 120,
    height: 40,
    borderRadius: 8,
    marginTop: 15,
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
  linkLogin: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ffffff',
  },
});