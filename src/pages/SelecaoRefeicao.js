import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import api from '../services/api';

export default class SelecaoRefeicao extends Component {
  state = {
    token: this.props.navigation.getParam('token'),
    dia: this.props.navigation.getParam('dia'),
    morning: {
      meal: {
        imageUrl: '',
      },
    },
    afternoon: {
      meal: {
        imageUrl: '',
      },
    },
    night: {
      meal: {
        imageUrl: '',
      },
    },
    ready: false,
    imagens: [],
    checkedManha: Boolean,
    checkedTarde: Boolean,
    checkedNoite: Boolean,
  };

  requisicao = async () => {
    await api
      .get(`/menuWeek/meal/${this.props.navigation.getParam('morning').meal}`, {
        headers: {Authorization: 'bearer ' + this.state.token},
      })
      .then(response => {
        this.setState({morning: response.data.data});
      })
      .catch(error => {
        console.warn(error);
      });

    await api
      .get(
        `/menuWeek/meal/${this.props.navigation.getParam('afternoon').meal}`,
        {
          headers: {Authorization: 'bearer ' + this.state.token},
        },
      )
      .then(response => {
        this.setState({afternoon: response.data.data});
      })
      .catch(error => {
        console.warn(error);
      });

    await api
      .get(`/menuWeek/meal/${this.props.navigation.getParam('night').meal}`, {
        headers: {Authorization: 'bearer ' + this.state.token},
      })
      .then(response => {
        this.setState({night: response.data.data});
      })
      .catch(error => {
        console.warn(error);
      });
    console.log(this.state.morning);
    console.log(this.state.afternoon);
    console.log(this.state.night);
    this.setState({ready: true});
  };

  componentDidMount() {
    this.requisicao();
  }

  static navigationOptions = {
    title: 'Cardápio',
  };

  render() {
    return (
      <ScrollView style="mealContainer">
        {this.state.ready ? (
          <View>
            {this.state.morning != null ? (
              <ImageBackground
                style={styles.mealImageStart}
                source={{
                  uri: `http://res.cloudinary.com/ddbpyte6h/image/upload/${
                    this.state.morning.imageUrl
                  }`,
                }}>
                <Text style={styles.mealText}>Manhã</Text>
              </ImageBackground>
            ) : (
              <View>
                <Text style={styles.noMealBox}>Manhã sem refeições :(</Text>
              </View>
            )}

            {this.state.afternoon != null ? (
              <ImageBackground
                style={styles.mealImageMidlle}
                source={{
                  uri: `http://res.cloudinary.com/ddbpyte6h/image/upload/${
                    this.state.afternoon.imageUrl
                  }`,
                }}>
                <Text style={styles.mealText}>Tarde</Text>
              </ImageBackground>
            ) : (
              <View>
                <Text style={styles.noMealBox}>Tarde sem refeições :(</Text>
              </View>
            )}

            {this.state.night != null ? (
              <ImageBackground
                style={styles.mealImageEnd}
                source={{
                  uri: `http://res.cloudinary.com/ddbpyte6h/image/upload/${
                    this.state.night.imageUrl
                  }`,
                }}>
                <Text style={styles.mealText}>Noite</Text>
              </ImageBackground>
            ) : (
              <View>
                <Text style={styles.noMealBox}>Noite sem refeições :(</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              style={styles.activityIndicator}
              color="#00f"
              size="large"
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 450,
  },
  activityIndicator: {
    paddingBottom: 40,
  },
  mealContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mealText: {
    width: '100%',
    height: '95%',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: '#FFFFFF',
    borderRadius: 8,
    textShadowColor: '#000',
    textShadowRadius: 5,
  },
  mealImageStart: {
    borderRadius: 8,
    width: '100%',
    height: 200,
  },
  mealImageMidlle: {
    borderRadius: 8,
    width: '100%',
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  mealImageEnd: {
    borderRadius: 8,
    alignSelf: 'center',
    width: '100%',
    height: 200,
  },
  noMealBox: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
