import React, { Component } from 'react';

import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "Sis-Cozinha"
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior= 'padding'
                enabled={Platform.OS === 'ios'}
            >
                <ImageBackground
                    source={require( '../assets/background_login.jpeg' )}
                    style={styles.imageBackground}>
                    <View style={styles.pinkBox}>
                        <Text style={styles.inText}>
                            Login
                        </Text>
                        
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder="Matricula"
                            style={styles.input}
                        />

                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder="Senha"
                            style={styles.input}
                        />
                        
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{marginTop: 5}}>
                            <Text style={styles.linkCadastro}>
                                Não registrado ainda? Crie uma conta
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    };
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
        height: 270,
        backgroundColor: '#F08080',
        alignItems: 'center',
        borderRadius: 5,
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
        flexDirection: "row",
        width: '100%',
    },
    button: {
        width: 220,
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
        fontSize: 13,
    }
})