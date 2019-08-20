import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { SafeAreaView, ActivityIndicator,  View, Text, StyleSheet } from 'react-native';

export default function Cardapio({ navigation }) {
    const token = navigation.getParam('token');
    var isLoading = true;
    var cardapio;
    
    function dadosMeal(){
        api.get(`/meal/${cardapio.monday.morning.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            console.log(response);
        })
    }

    useEffect(() => {
        api.get('/menuWeek/date/14-01-2019', {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio = response.data.data;
            isLoading = false;

            console.log(response.data.data);
            console.log(cardapio);
            console.log(isLoading);

            dadosMeal();
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

            { cardapio ? (
                    <View style={styles.daysContainer}>
                        <View style={styles.duplo}>
                            <View style={styles.daycard}>
                                <Text style={{color: "#FFF"}}>Tem merenda</Text>
                            </View>

                            <View style={styles.daycard}>
                                <Text style={{color: "#FFF"}}>Tem merenda</Text>
                            </View>
                        </View>

                        <View style={styles.duplo}>
                            <View style={styles.daycard}>
                                <Text style={{color: "#FFF"}}>Tem merenda</Text>
                            </View>

                            <View style={styles.daycard}>
                                <Text style={{color: "#FFF"}}>Tem merenda</Text>
                            </View>
                        </View>

                        <View style={styles.sexta}>
                            <Text style={{color: "#FFF"}}>Tem merenda</Text>
                        </View>
                    </View>
                ) : (
                    <ActivityIndicator
                        color='#99d9eb'
                        size='large'
                    />
                )
            }
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
    duplo: {
        flexDirection: 'row',
        marginTop: 10,
    },
    daycard: {
        backgroundColor: '#000',
        height: 150,
        width: 150,
        marginHorizontal: 10,
    },
    sexta: {
        marginTop: 10,
        backgroundColor: '#000',
        height: 150,
        width: 320,
        marginHorizontal: 10,
    }
});