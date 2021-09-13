import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  AsyncStorage,
} from "react-native";

import DraggableFlatList from "react-native-draggable-flatlist";
//import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./StyleFiles/BarMenuClassStyle";
import picture_linker from "./PictureLinkers/picture_linker";
import BarCard from "./BarCard.js";
import logo from "../assets/Barpedia_logo.png";
import bars from "../data/bars.json";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: bars,
      fetched: [],
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
    console.log("refreshing")
    fetch("https://barpedia.herokuapp.com/api/bars/")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          loading: false,
          fetched: responseData,
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  }

  componentDidMount() {
    console.log("MOUNTING")
    this.getData()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.refreshData();
    });
    //fetch("http:/192.168.0.5:3000/linedata")
    }
  
  componentWillUnmount() {
    this._unsubscribe();
  }


  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <BarCard
        key={item.id}
        barData={this.state.fetched}
        barName={item.name}
        barPic={item.pic_name}
        onLongPress={drag}
        onPress={() =>
          this.props.navigation.navigate("Details", {
            barData: this.state.fetched,
            name: item.name,
            barPic: item.pic_name,
            id: item.id,
            listenerprop: Date().toLocaleUpperCase(),
          })
        }
      />
    )  
  }

  storeData = async (value) => {
    try {
      console.log("STORING", value);
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
       console.log("error", e)
    }
  }

  
  getData = async () => {
    console.log("getting")
    try {
      var jsonValue = await AsyncStorage.getItem('@storage_Key')
      jsonValue = JSON.parse(jsonValue)
      console.log("RETURNING", jsonValue)
      this.setState({ data: jsonValue })
      //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
       console.log("error", e)
    }
  }

  
  dragEnd(data) {
    var test = [];
    this.state.data = this.setState({ data });
    this.storeData(data);

  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    } 
    console.log("HERERERE")
    //console.log(this.state.data)
    //console.log(this.getData());
    console.log(this.state.data)
    return (
        <View style={styles.container}>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollPercent={10}
            onDragEnd={({ data }) => this.dragEnd(data)}
          />
        </View>
    );
  }
}

