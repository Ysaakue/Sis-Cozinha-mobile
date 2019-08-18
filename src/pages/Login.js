import React, { Component } from 'react';

import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TextInput
} from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "Sis-Cozinha"
    }

    render() {
        return (
            <ImageBackground
                source={require( '../assets/background_login.jpeg' )}
                style={styles.imageBackground}>
                <View style={styles.pinkBox}>
                    <Text style={styles.inText}>
                        Login
                    </Text>
                    <TextInput placeholder="Matricula" style={styles.input} />
                    <TextInput placeholder="Senha" style={styles.input} />
                </View>
            </ImageBackground>
        );
    };
}

const styles = StyleSheet.create({
    imageBackground: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    pinkBox: {
        width: 290,
        height: 270,
        backgroundColor: "#F08080",
        alignItems: "center",
        borderRadius: 5,
    },
    inText: {
        marginTop: 10,
        fontSize: 20,
        color: "#FFF",
    },
    input: {
        backgroundColor: "#fff",
        width: 240,
        margin: 15,
        borderRadius: 5,
    }
})