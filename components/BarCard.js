import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button, Image, FlatList, ImageBackgroundComponent } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarCard({barName, barDescription}){
    return(
      <View style={styles.container}>
        <View style={styles.barTab}>
        <View style={styles.barUpperBox}>
        <View>
          <Text style={styles.barName}>{barName}</Text>
          </View>
        </View>
          <View style={styles.barTabTop}>
              <View style={styles.imageBox}>
                <Image
                  style={styles.barImage}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                />
              </View>
              <View style={styles.textBox}>
                <View style={styles.barMiddleBox}>
                    <View style={styles.barMiddleLeft}>
                      <Text>{barDescription}</Text>
                    </View>
                    <View style={styles.barMiddleRight}>
                      <Text>6:00 PM to 1:00 AM</Text>
                      <Text>4.8 Rating</Text>
                    </View>
                </View>
              </View>
            </View>
            <View style={styles.barBottomBox}>
                <Button title="More Info"></Button>
          </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    barTab: {
      width: windowWidth-20,
      height: 150,
      backgroundColor: "grey",
      marginBottom: 10,
      borderWidth: 2,
      borderColor: "black",
      flexDirection: "column"
      
    },
    imageBox: {
      flex: 1,
      padding: 5
    },
    textBox: {
      flex: 3
    },
    barName: {
      fontSize: 32
    },
    barImage: {
      width: 70,
      height: 70,
    },
    barUpperBox: {
      flex: 2,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center"
    },
    barMiddleBox: {
      flex: 1,
      backgroundColor: "green",
      flexDirection: "row"
    },
    barMiddleLeft: {
      flex: 1,
      backgroundColor: "blue"
    },
    barMiddleRight: {
      flex: 1,
      backgroundColor: "yellow"
    },
    barTabTop: {
      flex: 3,
      flexDirection: "row"
    },
    list: {
      flex: 1,
      display: "flex"
    }
  });


//   <BarCard barName="[NAME]" barDescription="[BAR DESCRIPTION]"/>