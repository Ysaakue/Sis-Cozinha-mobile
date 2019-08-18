import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function Cardapio() {
    const [ pratos, setPratos ] = useState('');

    useEffect(() => {
        async function loadPratos() {
            const response = await api.get('/menuWeek/date/19-08-2019', null);

            console.log(response);

            setPratos(response.data);
        }

        loadPratos();
    }, []);

    return (
        <SafeAreaView style={styles.header}>
            <Text style={styles.headerText}>
                Cardápio
            </Text>
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
    }
});