import React, {Component} from 'react';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default class Login extends Component {
  state = {
    matricula: '',
    senha: '',
    Logando: false,
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        console.log('tem token',token);
        console.log({token:token});
        
        this.props.navigation.navigate('SelecaoDias', {token:token});
      }
    });
  }

  salvar = async valor => {
    await AsyncStorage.setItem('token', valor);
  };

  handleLogin = async () => {
    this.setState({ login: true });
    var erro = '';
    var validations = [];

    if (this.state.matricula.length > 0 && this.state.senha.length) {
      if (this.state.senha.length >= 6) {
        validations.push('ok');
      } else {
        erro = 'Informe uma senha com 6 ou mais caracteres!';
      }
      if (this.state.matricula.length == 14) {
        validations.push('ok');
      } else {
        erro = 'A matricula deve conter 14 caracteres!';
      }
    } else {
      erro = 'Preencha todos os campos!';
    }

    if (validations.length == 2) {

      await api
        .post('/authUser/login', {
          enrollment: this.state.matricula,
          password: this.state.senha,
        })
        .then(response => {
          
          const token = response.data.token;
          console.log(token);
          this.salvar(token);
          this.props.navigation.navigate('SelecaoDias', {token:token});
          this.setState({ Logando: false });
        })
        .catch(error => {
          console.log(error.response);
          // console.warn(error);
          Alert.alert('Erro ao fazer login', 'Matricula ou senha inválidos!');
          this.setState({ Logando: false });
        });
    } else {
      Alert.alert('Erro ao fazer login', erro);
      this.setState({ Logando: false });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
        <ImageBackground
          source={require('../assets/background_login.jpeg')}
          style={styles.imageBackground}>
          <View style={styles.pinkBox}>
            <Text style={styles.inText}>Login</Text>

            <Input
              placeholder="Matricula"
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              value={this.state.matricula}
              onChangeText={text => this.setState({matricula: text})}
            />
            <Input
              placeholder="Senha"
              autoCapitalize="none"
              secureTextEntry={true}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              value={this.state.senha}
              onChangeText={text => this.setState({senha: text})}
            />

            <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
              { this.state.Logando ? (
                <ActivityIndicator
                style={styles.activityIndicator}
                color="#00f"
                size="large"
                />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Cadastro');
              }}
              style={{marginTop: 15}}
            >
              <Text style={styles.linkCadastro}>Não é registrado ainda?</Text>
              <Text style={styles.linkCadastro}>Crie uma conta!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
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
    height: 300,
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
  inputContainer: {
    width: 240,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  inputText: {
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
