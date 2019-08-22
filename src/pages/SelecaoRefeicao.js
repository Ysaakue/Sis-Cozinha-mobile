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
    morning: Object,
    afternoon: this.props.navigation.getParam('afternoon'),
    night: this.props.navigation.getParam('night'),
    ready: false,
    imagens: [],
    ready: false,
  }

  requisicao = async () => {
    await api.get(`/menuWeek/meal/5be9d59892adc200040568f1`, {
        headers: { Authorization: "bearer " + this.state.token }
      })
      .then(response => {
        console.log(response);
        this.setState({morning: response.data.data});
        console.log("terminou: " + this.state.morning);
      })
      .catch(error => {console.warn(error)})
  }

  componentDidMount(){
    console.log( this.props.navigation.getParam('afternoon'), this.props.navigation.getParam('night'));
    this.requisicao();

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