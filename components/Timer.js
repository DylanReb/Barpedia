import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { AsyncStorage } from 'react-native';

export default function Timer({ barName, lineLeap, Review, onPress = (f) => f }) {
  const [Linetime, setLineTime] = useState("");
  const [Reviewtime, setReviewTime] = useState("");
  const STORAGE_KEY_LINE = barName;
  const STORAGE_KEY_REVIEW = barName + "review";


  useEffect(() => {
    readDataLine();
    readDataReview();
  }, []);

  // read data
  const readDataLine = async () => {
    try {
      const Linetime = await AsyncStorage.getItem(STORAGE_KEY_LINE);

      if (Linetime !== null) {
        setLineTime(Linetime);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  const readDataReview = async () => {
    try {
      const Reviewtime = await AsyncStorage.getItem(STORAGE_KEY_REVIEW);

      if (Reviewtime !== null) {
        setReviewTime(Reviewtime);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  // save data
  const num = Date.now().toString();
  const Linediff = num - Linetime;
  const Reviewdiff = num - Reviewtime;

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  var button;
  var activeText;
  if (Review == "1") {
    activeText = "Submit Review for " + barName;
  } else {
    activeText = "Report Line/Cover Charge for " + barName;
  }

  if (lineLeap) {
    button = <Button disabled title="Cannot Report for Line Leap"></Button>;
  }
  else if (Review == "0" && Linediff > 60000) {
    button = <Button title={activeText} onPress={() => onPress()} color='#0696E9'></Button>;
  } else if (Review == "1" && Reviewdiff > 60000) {
    button = <Button title={activeText} onPress={() => onPress()} color='#0696E9'></Button>;
  } else {
    button = <Button disabled title="Already Submitted"></Button>;
  }

  return <View style={styles.button}>{button}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 5,
  },
});
