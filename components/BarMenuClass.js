import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';

import styles from "./StyleFiles/BarMenuClassStyle";
import styles2 from "./StyleFiles/BarCardStyle";
import picture_linker from "./PictureLinkers/picture_linker";
import BarCard from "./BarCard.js";
import logo from "../assets/Barpedia_logo.png";




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      refresh: 0,
      data_example: [
        {
         "_id": "612a628d8100e56d708ae7c5",
         "id": 12,
         "name": "Jax",
         "pic_name": "Jax",
       },
       {
         "_id": "612bec591225f0849f5c3e08",
         "id": 13,
         "name": "Stagewest",
         "pic_name": "Stagewest",
       },
     ]
    };
  }

  refreshData() {
    fetch("https://barpedia.herokuapp.com/api/bars/")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          loading: false,
          data: responseData,
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.refreshData();
    });
    //fetch("http:/192.168.0.5:3000/linedata")
    }
  
  componentWillUnmount() {
    this._unsubscribe();
  }

  /*
  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    const bar_link = picture_linker.getBarLink(item.pic_name);
    return(
      <TouchableHighlight
        style={styles2.barTab}
        onPress={() => onPress()}
        onLongPress={move}
        onPressOut={moveEnd}
        underlayColor="white"
      >
        <ImageBackground style={styles2.image} imageStyle={{borderRadius:12}} source={bar_link}>
          <View style={styles2.nameBox}>
            <Text style={styles2.barName}>{item.name}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  }
  */

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <BarCard
        key={item.id}
        barName={item.name}
        barCoverCharge={item.coverCharge}
        barPic={item.pic_name}
        barLine={item.line}
        onLongPress={move}
        onPressOut={moveEnd}
        onPress={() =>
          this.props.navigation.navigate("Details", {
            name: item.name,
            description: item.description,
            barPic: item.pic_name,
            coverCharge: item.coverCharge,
            line: item.line,
            id: item.id,
            listenerprop: Date().toLocaleUpperCase(),
          })
        }
      />
    )  
  }
  /*
  renderColor = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={{ 
          height: 100, 
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        onLongPress={move}
        onPressOut={moveEnd}>
        <Text style={{ 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 32,
        }}>{item.label}</Text>
      </TouchableOpacity>
    )
  }
*/
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    //console.log(Date().toLocaleLowerCase())
    //console.log(this.state.data_test);
    //console.log(this.state.data);
    return (
        <View style={styles.container}>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollPercent={10}
            onMoveEnd={({ data }) => this.setState({ data })}
          />
        </View>
    );
  }
}

