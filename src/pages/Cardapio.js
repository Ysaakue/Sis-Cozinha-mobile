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
    
    async function dadosMeal(){
        await api
        .get(`/menuWeek/meal/${cardapio.monday.morning.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.monday.morning.meal = response.data.data;
            console.log(cardapio.monday.morning.meal);
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.monday.afternoon.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.monday.afternoon.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.monday.night.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.monday.night.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.tuesday.morning.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.tuesday.morning.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.tuesday.afternoon.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.tuesday.afternoon.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.tuesday.night.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.tuesday.night.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.wednesday.morning.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.wednesday.morning.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.wednesday.afternoon.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.wednesday.afternoon.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.wednesday.night.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.wednesday.night.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.thursday.morning.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.thursday.morning.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.thursday.afternoon.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.thursday.afternoon.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.thursday.night.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.thursday.night.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.friday.morning.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.friday.morning.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.friday.afternoon.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.friday.afternoon.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })

        await api
        .get(`/menuWeek/meal/${cardapio.friday.night.meal}`, {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio.friday.night.meal = response.data.data;
        })
        .catch(error => {
            console.warn(error);
        })
    }

    useEffect(() => {
        api.get('/menuWeek/date/14-01-2019', {
            headers: { Authorization: "bearer " + token }
        })
        .then(response => {
            cardapio = response.data.data;
            isLoading = false;

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


            <View style={styles.daysContainer}>
                <View style={styles.double}>
                    <View style={styles.daycard}>
                        <ImageBackground
                            source={{ uri: `http://res.cloudinary.com/ddbpyte6h/image/upload/${cardapio.monday.morning.meal}`}}
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