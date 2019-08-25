import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Input} from 'react-native-elements';
import {
  ScrollView,
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
import api from '../services/api';

export default class Cadastro extends Component {
  state = {
    nome: '',
    email: '',
    matricula: '',
    telefone: '',
    senha: '',
    senhaConfirm: '',
    isLoading: false,
    Cadastrando: false,
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        this.props.navigation.navigate('SelecaoDias', {token});
      }
    });
  }

  salvar = async token => {
    await AsyncStorage.setItem('token', token);
  };

  handleLogin = () => {
    this.props.navigation.navigate('Login');
  };

  autoLogin = async () => {
    await api
      .post('/authUser/login', {
        enrollment: this.state.matricula,
        password: this.state.senha,
      })
      .then(response => {
        const {token} = response.data;
        this.salvar(token);
        this.props.navigation.navigate('SelecaoDias', {token});
      })
      .catch(() => {
        Alert.alert('Erro ao fazer login');
      });
  };

  handleCadastro = async () => {
    this.setState({ Cadastrando: true });
    var erro = '';
    var validations = [];
    if (
      this.state.nome.length > 0 &&
      this.state.email.length > 0 &&
      this.state.matricula.length > 0 &&
      this.state.telefone.length > 0 &&
      this.state.senha.length > 0 &&
      this.state.senhaConfirm.length > 0
    ) {
      if (this.state.email.match(/(@)/)) {
        validations.push('ok');
      } else {
        erro = 'Informe um e-mail válido!';
      }
      if (this.state.matricula.length == 14) {
        validations.push('ok');
      } else {
        erro = 'Informe uma matricula válida!';
      }
      if (this.state.telefone.length > 8) {
        validations.push('ok');
      } else {
        erro = 'Informe um telefone válido!';
      }
      if (this.state.senha.length > 7) {
        validations.push('ok');
      } else {
        erro = 'Informe uma senha com mais de 8 caracteres!';
      }
      if (this.state.senha.match(this.state.senhaConfirm)) {
        validations.push('ok');
      } else {
        erro = 'As senhas não conferem!';
      }
    } else {
      erro = 'Preencha todos os campos!';
    }

    if (validations.length == 5) {
      this.state.isLoading = true;
      await api
        .post('/authUser/', {
          name: this.state.nome,
          email: this.state.email,
          phone: this.state.telefone,
          enrollment: this.state.matricula,
          password: this.state.senha,
        })
        .then(() => {
          this.autoLogin();
          this.setState({ Cadastrando: false });
        })
        .catch(() => {
          Alert.alert('Erro ao criar conta');
          this.setState({ Cadastrando: false });
        });
    } else {
      Alert.alert('Erro ao criar conta', erro);
      this.setState({ Cadastrando: false });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
        {this.state.isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              style={styles.activityIndicator}
              color="#00f"
              size="large"
            />
          </View>
        ) : (
          <ImageBackground
            source={require('../assets/background_login.jpeg')}
            style={styles.imageBackground}
          >
            <ScrollView
              contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
              <View style={styles.pinkBox}>
                <Text style={styles.inText}>Criar conta</Text>
                <Input
                  placeholder="Nome"
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.input}
                  inputStyle={styles.inputText}
                  value={this.state.nome}
                  onChangeText={text => this.setState({nome: text})}
                />

                <Input
                  placeholder="Email"
                  autoCapitalize="none"
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.input}
                  inputStyle={styles.inputText}
                  value={this.state.email}
                  onChangeText={text => this.setState({email: text})}
                />

                <Input
                  autoCapitalize="none"
                  placeholder="Matricula"
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.input}
                  inputStyle={styles.inputText}
                  value={this.state.matricula}
                  onChangeText={text => this.setState({matricula: text})}
                />

                <Input
                  autoCapitalize="none"
                  placeholder="Telefone"
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.input}
                  inputStyle={styles.inputText}
                  value={this.state.telefone}
                  onChangeText={text => this.setState({telefone: text})}
                />

                <Input
                  autoCapitalize="none"
                  secureTextEntry={true}
                  placeholder="Senha"
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.input}
                  inputStyle={styles.inputText}
                  value={this.state.senha}
                  onChangeText={text => this.setState({senha: text})}
                />

                <Input
                  autoCapitalize="none"
                  secureTextEntry={true}
                  placeholder="Confirme a senha"
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.input}
                  inputStyle={styles.inputText}
                  value={this.state.senhaConfirm}
                  onChangeText={text => this.setState({senhaConfirm: text})}
                />

                <TouchableOpacity
                  onPress={this.handleCadastro}
                  style={styles.button}
                >
                  { this.state.Cadastrando ? (
                    <ActivityIndicator
                    style={styles.activityIndicator}
                    color="#00f"
                    size="large"
                    />
                  ) : (
                    <Text style={styles.buttonText}>Cadastrar</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}
                  style={{marginTop: 10}}>
                  <Text style={styles.linkLogin}>Já é registrado?</Text>
                  <Text style={styles.linkLogin}>Faça o login!</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </ImageBackground>
        )}
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
    height: 545,
    backgroundColor: '#F08080',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 15,
  },
  inText: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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
  activityIndicatorContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
