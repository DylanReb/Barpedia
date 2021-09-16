import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Image,
  Modal,
  Pressable,
} from "react-native";

import DraggableFlatList from "react-native-draggable-flatlist";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./StyleFiles/BarMenuClassStyle";
import picture_linker from "./PictureLinkers/picture_linker";
import BarCard from "./BarCard.js";
import logo from "../assets/Barpedia_logo_2.png";
import demo1 from "../assets/favorite_demo_1.png";
import demo2 from "../assets/favorite_demo_2.png";
import demo3 from "../assets/favorite_demo_3.png";
import bars from "../data/bars.json";

const IGURL = "https://www.instagram.com/barpedia_psu/";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: bars,
      fetched: [],
      refresh: 0,
      modal_visible: true
    };
  }

  refreshData() {
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
    this.getModal()
    this.getFavorites()
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

  storeFavorites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
       console.log("error", e)
    }
  }

  
  getFavorites = async () => {
    try {
      var jsonValue = await AsyncStorage.getItem('@storage_Key')
      jsonValue = JSON.parse(jsonValue)
      if (jsonValue !== null) {
        this.setState({ data: jsonValue })
      } else {
        this.setState({ data: bars })
      }
        //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
       console.log("error", e)
    }
  }

  removeFavorites = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  storeModal = async (value) => {
    console.log("STORING MODAl")
    try {
      this.setState({ modal_visible: false })
      await AsyncStorage.setItem('@modal', JSON.stringify({"value":"false"}))
    } catch (e) {
      console.log("error", e)
      // saving error
    }
  }

  getModal = async () => {
    console.log("GETTING MODAL")
    try {
      var modal = await AsyncStorage.getItem('@modal')
      console.log(modal)
      if (modal !== null) {
        this.setState({ modal_visible: false })
      } else {
        this.setState({ modal_visible: true })
      }
        //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
       console.log("error", e)
    }
  }

  removeModal = async () => {
    try {
      await AsyncStorage.removeItem('@modal')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  dragEnd(data) {
    var test = [];
    this.state.data = this.setState({ data });
    this.storeFavorites(data);

  }

  footer = () => {
    return (
      <>  
        <Image style={styles.logo} source={logo}></Image>
        <View style={styles.comments}>
          <Text>Feedback? Email us at barpediaapp@gmail.com</Text>
        </View>
      </>
    );
  };


  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    console.log("HGERERE")
    return ( 
        <View style={styles.container}>
          <Modal
            visible={this.state.modal_visible}
            onRequestClose={() => {
              this.setState({ modal_visible: false })
            }}
          >
            <View style={styles.modal}>
              <Text style={styles.modal_title}>Press and hold on a bar to be able to drag and drop it in desired spot</Text>
              <Image style={styles.demo} source={demo2}></Image>
              <Pressable
                  style={styles.button}
                  onPress={() => this.storeModal(false)}
                >
                  <Text style={styles.textStyle}>Close Favorites Demo</Text>
              </Pressable>
            </View>
          </Modal>
          <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollPercent={10}
            autoscrollSpeed={125}
            onDragEnd={({ data }) => this.dragEnd(data)}
            ListFooterComponent={this.footer}
            extraData={this.state.fetched}
          />
        </View>
    );
  }
}

