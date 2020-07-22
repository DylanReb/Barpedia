import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Button,
  Image,
  FlatList,
  ImageBackgroundComponent,
} from "react-native";
import barsList from "./data/bars.json";
import BarCard from "./components/BarCard.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  return (
    <>
      <FlatList
        style={styles.container}
        data={barsList}
        renderItem={({ item }) => {
          return (
            <BarCard
              key={item.id}
              barName={item.name}
              barDescription={item.description}
              barPic={item.pic_name}
            />
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
