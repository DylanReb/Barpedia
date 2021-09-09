import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';

import styles from "./StyleFiles/BarMenuClassStyle"
import BarCard from "./BarCard.js";
import logo from "../assets/Barpedia_logo.png";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      refresh: 0,
    };
  }

  refreshData() {
    fetch("https://barpedia.herokuapp.com/api/bars/")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          loading: false,
          dataSource: responseData,
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
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
        <View style={styles.container}>
          <DraggableFlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollPercent={10}
            onMoveEnd={({ data }) => this.setState({ data })}
          />
        </View>
    );
  }
}

