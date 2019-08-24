import React, { Component } from 'react';
import{
  Text,
  Image,
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
    morning: {
      meal: {
        imageUrl: '',
      }
    },
    afternoon: {
      meal: {
        imageUrl: '',
      }
    },
    night: {
      meal: {
        imageUrl: '',
      }
    },
    ready: false,
    imagens: [],
    ready: false,
  }

  requisicao = async () => {
    await api.get(`/menuWeek/meal/${this.props.navigation.getParam('morning').meal}`, {
        headers: { Authorization: "bearer " + this.state.token }
      })
      .then(response => {
        this.setState({morning: response.data.data});
      })
      .catch(error => {console.warn(error)})

    await api.get(`/menuWeek/meal/${this.props.navigation.getParam('afternoon').meal}`, {
        headers: { Authorization: "bearer " + this.state.token }
      })
      .then(response => {
        this.setState({afternoon: response.data.data});
      })
      .catch(error => {console.warn(error)})

    await api.get(`/menuWeek/meal/${this.props.navigation.getParam('night').meal}`, {
        headers: { Authorization: "bearer " + this.state.token }
      })
      .then(response => {
        this.setState({night: response.data.data});
      })
      .catch(error => {console.warn(error)})
    
    console.log(this.state.morning);
    console.log(this.state.afternoon);
    console.log(this.state.night);
    this.setState({ ready: true});
  }

  componentDidMount(){
    this.requisicao();
  }

  static navigationOptions = {
    title: 'Cardápio'
  }

  render() {
    return (
      <SafeAreaView>
        {this.state.ready ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator style={styles.activityIndicator} color='#00f' size='large'/>
          </View>
        ) : (
          <View>
            { this.state.morning != null ? (
              <Image 
                style={{width:100,height:100}}
                source={{uri: `http://res.cloudinary.com/ddbpyte6h/image/upload/${this.state.morning.imageUrl}`}}
              />
            ) : (
              <View>
                <Text>
                  Manha Vazio
                </Text>
              </View>
            )}

            { this.state.afternoon != null ?  (
              <Image 
                style={{width:100,height:100}}
                source={{uri: `http://res.cloudinary.com/ddbpyte6h/image/upload/${this.state.afternoon.imageUrl}`}}
              />
            ) : (
              <View>
                <Text>
                  Tarde Vazio
                </Text>
              </View>
            )}

            { this.state.night != null ? (
              <Image 
                style={{width:100,height:100}}
                source={{uri: `http://res.cloudinary.com/ddbpyte6h/image/upload/${this.state.night.imageUrl}`}}
              />
            ) : (
              <View>
                <Text>
                  Noite Vazio
                </Text>
              </View>
            )}
          </View>
        )}
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