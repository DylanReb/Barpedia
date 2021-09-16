import React from "react";
import {
  ImageBackground,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Icon } from "native-base";

import picture_linker from "./PictureLinkers/picture_linker";
import styles from "./StyleFiles/BarCardStyle.js";

export default function BarCard({
  barData,
  barName,
  barPic,
  onPress = (f) => f,
  onLongPress = (f) => f,
}) {
  const bar_link = picture_linker.getBarLink(barPic);
  const bar_data = barData.find((element) => {
    return element.name === barName;
  });
  var coverIcon;
  if(bar_data.coverCharge > 0){
    coverIcon = <Icon name="dollar" type="FontAwesome" style={styles.icon}></Icon>
  }
  if (bar_data.line == 1) {
    return (
      <TouchableHighlight
        style={styles.barTab}
        onPress={() => onPress()}
        onLongPress={() => onLongPress()}
        underlayColor="white"
      >
        <ImageBackground style={styles.image} imageStyle={{borderRadius:12}} source={bar_link}>
          <View style={styles.nameBox}>
            <View style={styles.icon}>
              <Icon name="person" type="Ionicons" style={styles.icon}></Icon>
              {coverIcon}
            </View>
            <Text style={styles.barName}>{barName}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  } else if (bar_data.line == 2) {
    return (
      <TouchableHighlight
        style={styles.barTab}
        onPress={() => onPress()}
        onLongPress={() => onLongPress()}
        underlayColor="white"
      >
        <ImageBackground style={styles.image} imageStyle={{borderRadius:12}} source={bar_link}>
          <View style={styles.nameBox}>
            <View style={styles.icon}>
              <Icon name="person" type="Ionicons" style={styles.icon}></Icon>
              <Icon name="person" type="Ionicons" style={styles.icon}></Icon>
              {coverIcon}
            </View>
            <Text style={styles.barName}>{barName}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  } 
  else if (bar_data.line == 0){
    return(
      <TouchableHighlight
        style={styles.barTab}
        onPress={() => onPress()}
        onLongPress={() => onLongPress()}
        underlayColor="white"
      >
        <ImageBackground style={styles.image} imageStyle={{borderRadius:12}} source={bar_link}>
          <View style={styles.nameBox}>
            <View style={styles.icon}>
              {coverIcon}
            </View>
            <Text style={styles.barName}>{barName}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  }
  else if (bar_data.line == 3) {
    return (
      <TouchableHighlight
        style={styles.barTab}
        onPress={() => onPress()}
        onLongPress={() => onLongPress()}
        underlayColor="white"
      >
        <ImageBackground style={styles.image} imageStyle={{borderRadius:12}} source={bar_link}>
          <View style={styles.nameBox}>
            <View style={styles.icon}>
              <Icon name="person" type="Ionicons" style={styles.icon}></Icon>
              <Icon name="person" type="Ionicons" style={styles.icon}></Icon>
              <Icon name="person" type="Ionicons" style={styles.icon}></Icon> 
              {coverIcon}
            </View>
            <Text style={styles.barName}>{barName}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
    
  } 
}
