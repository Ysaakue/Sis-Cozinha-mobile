import React, { Component } from 'react';
import { ListItem, Icon } from 'react-native-elements'
import api from '../services/api';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const list = [{
    id: '0',
    dia: 'Segunda',
    abrev: 'seg',
  },
  {
    id: '1',
    dia: 'Terça',
    abrev: 'Ter'
  },
  {
    id: '2',
    dia: 'Quarta',
    abrev: 'Qua'
  },
  {
    id: '3',
    dia: 'Quinta',
    abrev: 'Qui'
  },
  {
    id: '4',
    dia: 'Sexta',
    abrev: 'Sex'
  }
]

export default class SelecaoDias extends Component {
  state = {
    token: this.props.navigation.getParam('token'),
    dias: [],
    ready: false,
  }

  static navigationOptions = {
    title: 'Cardápio Semanal'
  }

  componentDidMount() {
    api.get('/menuWeek/date/14-01-2019', {
      headers: { Authorization: "bearer " + this.state.token }
    })
    .then(response => {
        this.setState({ dias: [...this.state.dias , response.data.data.monday] });
        this.setState({ dias: [...this.state.dias , response.data.data.tuesday] });
        this.setState({ dias: [...this.state.dias , response.data.data.wednesday] });
        this.setState({ dias: [...this.state.dias , response.data.data.thursday] });
        this.setState({ dias: [...this.state.dias , response.data.data.friday] });

        this.setState({ ready: true });
    })
    .catch(error => {
        console.warn(error);
        alert(error);
        this.setState({ ready: true });
    })
  }

  keyExtractor = (item, index) => index.toString()

  handleDay = (index) => {
    const dia = list[index];
    const temp = this.state.dias[index];
    const morning = temp.morning;
    const afternoon = temp.afternoon;
    const night = temp.night;

    this.props.navigation.navigate('SelecaoRefeicao', { dia, morning, afternoon, night });
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
      onPress={() => this.handleDay(item.id)}
    />
  )

  render() {
    return (
      <SafeAreaView>
        {
          this.state.ready ? (
              <View style={styles.listContainer}>
                <FlatList
                  keyExtractor={item => item.id}
                  data={list}
                  renderItem={this.renderItem}
                />
              </View>
          ) : (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator style={styles.activityIndicator} color='#00f' size='large'/>
            </View>
          )
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer:{
    justifyContent: 'center',
    alignContent: 'center',
  },
  ListItem: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '98%',
    marginHorizontal: '1%',
    minWidth: 130, 
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  activityIndicator: {
    paddingBottom: 40,
  }
});