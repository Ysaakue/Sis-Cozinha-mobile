import React, { useEffect } from 'react';
import api from '../services/api';
import {
    SafeAreaView,
    ImageBackground,
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function Cardapio({ navigation }) {
    const token = navigation.getParam('token');
    var cardapio;
    


    useEffect(() => {
        api.get('/menuWeek/date/14-01-2019', {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio = response.data.data;
            isLoading = false;

            
        })
        .catch(error => {
            console.warn(error);
            isLoading = false;
        })
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Cardápio Semanal
                </Text>
            </View>


            <View style={styles.daysContainer}>
                <View style={styles.double}>
                    <View style={styles.daycard}>
                        <ImageBackground
                            source={{ uri: `http://res.cloudinary.com/ddbpyte6h/image/upload/Cuscuz`}}
                            style={styles.Imagebackground}
                        >
                            <View style={styles.footerDayCard}>
                                <Text style={styles.texFooterDayCard}>
                                    Segunda
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 30,
    },
    daysContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    double: {
        flexDirection: 'row',
        marginTop: 10,
    },
    daycard: {
        backgroundColor: '#000',
        height: 150,
        width: 150,
        marginHorizontal: 10,
    },
    friday: {
        marginTop: 10,
        backgroundColor: '#000',
        height: 150,
        width: 320,
        marginHorizontal: 10,
    },
    Imagebackground: {
        height: 150,
        width: 150,
    },
    footerDayCard :{

    },
    texFooterDayCard: {

    }
});