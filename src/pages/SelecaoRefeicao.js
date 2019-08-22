import React, { Component } from 'react';
import{
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import api from '../services/api';

export default class SelecaoRefeicao extends Component {
  state = {
    token: this.props.navigation.getParam('token'),
    dia: this.props.navigation.getParam('dia'),
    morning: {},
    afternoon: this.props.navigation.getParam('afternoon'),
    night: this.props.navigation.getParam('night'),
    ready: false,
    imagens: [],
    ready: false,
  }

  componentDidMount(){
    console.log( this.props.navigation.getParam('afternoon'), this.props.navigation.getParam('night'));
    await api
      .get(`/menuWeek/meal/${this.props.navigation.getParam('morning').meal}`)
    
    this.setState({ ready: true});
  }

  static navigationOptions = {
    title: 'Cardápio'
  }

  render() {
    return (
      <SafeAreaView>
        {this.state.ready ? (
          <View></View>
        ) : (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator style={styles.activityIndicator} color='#00f' size='large'/>
          </View>
        )
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  activityIndicator: {
    paddingBottom: 40,
  },
})