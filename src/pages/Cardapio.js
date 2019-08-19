import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { SafeAreaView, ScrollView,  View, Text, StyleSheet } from 'react-native';

export default function Cardapio({ navigation }) {
    const token = navigation.getParam('token')
    const [ cardapio, setCardapio ] = useState({});

    useEffect(() => {
        async function loadCardapio() {
            const response = await api.get('/menuWeek/date/14-01-2019', {
                headers: { Authorization: "bearer " + token }
              });

            setCardapio(response.data.data);
            const cardapio = response.data.data;
            console.log(response.data.data);
        }

        loadCardapio();
    }, []);

    return (
        <SafeAreaView >
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Cardápio Semanal
                    </Text>
                </View>

                <View style={styles.daysContainer}>
                    <View style={styles.duplo}>
                        { 
                            cardapio.monday ? (
                                <View style={styles.daycard}>
                                    <Text style={{color: "#FFF"}}>Tem merenda</Text>
                                </View>
                            ) : (
                                <View style={styles.daycard}>
                                    <Text style={{color: "#FFF"}}>Sem merenda</Text>
                                </View>
                            )
                        }

                        { 
                            cardapio.tuesday ? (
                                <View style={styles.daycard}>
                                    <Text style={{color: "#FFF"}}>Tem merenda</Text>
                                </View>
                            ) : (
                                <View style={styles.daycard}>
                                    <Text style={{color: "#FFF"}}>Sem merenda</Text>
                                </View>
                            )
                        }
                    </View>

                    <View style={styles.duplo}>
                        { 
                            cardapio.wednesday ? (
                                <View style={styles.daycard}>
                                    <Text style={{color: "#FFF"}}>Tem merenda</Text>
                                </View>
                            ) : (
                                <View style={styles.daycard}>
                                    <Text style={{color: "#FFF"}}>Sem merenda</Text>
                                </View>
                            )
                        }

                        { 
                            cardapio.thursday ? (
                                <View style={styles.daycard}>
                                    <Text style={{color: "#FFF"}}>Tem merenda</Text>
                                </View>
                            ) : (
                                <View style={styles.daycard}>
                                    <Text style={{color: "#FFF"}}>Sem merenda</Text>
                                </View>
                            )
                        }
                    </View>

                    { 
                        cardapio.friday ? (
                            <View style={styles.sexta}>
                                <Text style={{color: "#FFF"}}>Tem merenda</Text>
                            </View>
                        ) : (
                            <View style={styles.sexta}>
                                <Text style={{color: "#FFF"}}>Sem merenda</Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
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