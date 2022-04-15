import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';

import axios from 'axios';

export default class MeteorsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meteors: {},
    };
  }

  componentDidMount() {
    this.getMetors();
  }

  getMetors = () => {
    axios
      .get(
        'https://api.nasa.gov/neo/rest/v1/feed?api_key=JNeEpIM11ibpJnUZxHMvSS4FnGEsHPgeiYjRqvL9'
      )
      .then((response) => {
        this.setState({
          meteors: response.data.near_earth_objects,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    //Object as in OOPS(Object Oriented Programming) to check if there is any length of data fetched in the getmeteors function
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Image
            style={styles.loadGif}
            source={require('../assets/loading.gif')}
          />
        </View>
      );
    } else {
      //child array to store the data of one week
      let meteor_arr = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });
      //array of object carrying the
      //concat combines arrays
      //apply()getting data from source to destination
      let meteors = [].concat.apply([], meteor_arr); //(destination, source)

      //for each is a loop for running a function in an array
      //here we are calculating threat score of each astroid one by one
      //element is a s=local variable to store date from meteors and use 
      meteors.forEach(function (element) {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;

        console.log(threatScore);
      });

      return (
        <View style={styles.container}>
          <Text style={[styles.titleText, {textAlign:'centre'}]}> METEORS </Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  androidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  mapContainer: {
    flex: 0.5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    height: 290,
    width: 300,
    marginTop: 20,
    marginLeft: 9,
    backgroundColor: 'rgba(180,180,255,0.45)',
    borderWidth: 5,
    borderColor: '#748ABB',
    borderRadius: 30,
  },
  infoText: {
    marginTop: 14,
    marginLeft: 9,
    fontSize: 18,
    color: 'white',
  },
  loadGif: {
    height: 90,
    width: 90,
  },
});

//chipmunk
