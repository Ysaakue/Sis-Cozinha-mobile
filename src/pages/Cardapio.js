import React, { Component } from 'react';
import { ListItem, Icon } from 'react-native-elements'
import api from '../services/api';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

const list = [{
    id: '1',
    dia: 'Segunda',
    abrev: 'seg',
  },
  {
    id: '2',
    dia: 'Terça',
    abrev: 'Ter'
  },
  {
    id: '3',
    dia: 'Quarta',
    abrev: 'Qua'
  },
  {
    id: '4',
    dia: 'Quinta',
    abrev: 'Qui'
  },
  {
    id: '5',
    dia: 'Sexta',
    abrev: 'Sex'
  }
]

export default class Cardapio extends Component {
  state = {
    token: this.props.navigation.getParam('token'),
    cardapio: {},
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    ready: false,
  }

  componentDidMount() {
    api.get('/menuWeek/date/14-01-2019', {
      headers: { Authorization: "bearer " + this.state.token }
    })
    .then(response => {
        this.setState({ cardapio: response.data.data });
    })
    .catch(error => {
        console.warn(error);
    })
  }

  keyExtractor = (item, index) => index.toString()

  handleDay = () => {
    console.log(this.keyExtractor);
  }
  
  renderItem = ({ item }) => (
    <ListItem
      key={item.id}
      title={item.dia}
      rightIcon={
        <Icon 
          name='chevron-right'
          type='font-awesome'
        />}
      style={styles.ListItem}
      onPress={this.handleDay}
    />
  )

  render() {
    return (
      <SafeAreaView>
          <View style={styles.header}>
              <Text style={styles.headerText}>
                  Cardápio Semanal
              </Text>
          </View>

          <FlatList
            keyExtractor={this.keyExtractor}
            data={list}
            renderItem={this.renderItem}
          />
      </SafeAreaView>
    );
  }
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
  ListItem: {
    paddingTop: 15,
  }
});