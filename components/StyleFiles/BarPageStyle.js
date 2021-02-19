import {StyleSheet, Dimensions} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
    scroll: {
      flex: 1,
    },
    fit: {
      flexGrow: 1,
      height: windowHeight,
    },
    container: {
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
    },
    box: {
      borderWidth: 1,
      borderRadius: 20,
      margin: 4,
    },
    pageImage: {
      width: windowWidth - 10,
      height: 150,
      justifyContent: "flex-start",
    },
    titleBox: {
      backgroundColor: 'argba(10, 10, 10, 0.6)',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      width: windowWidth - 10,
    },
    barTitle: {
      fontSize: 32,
      marginBottom: 5,
      color: "white",
      textAlign: "center",
    },
    review: {
      margin: 5,
    },
    line_and_cover: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
      height: 100,
    },
    line_and_cover_text: {
      fontSize: 16,
      color: 'black',
      fontWeight: "bold",
    },
    accordion: {
      width: windowWidth - 5,
      marginTop: 5,
      marginBottom: 2,
      marginLeft: 5,
      marginRight: 5,
      flex: 1,
    },
    accordionHeader: {
      backgroundColor: "#FFFFFF",
      borderColor: "black",
      borderWidth: 0.1,
      borderRadius: 10,
      marginHorizontal: 5
    },
    menuandDrinkTile: {
      flex: 1,
      flexDirection: "row",
      margin: 5,
      marginTop: 2.5,
      width: windowWidth - 10,
      height: 50,
    },
    menuTile: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 10,
      margin: 2.5,
      backgroundColor: '#0696E9',
    },
    menuIcon: {
      color: 'white',
      marginTop: 3,
    },
    title: {
      fontSize: 32,
      color: "white",
    },
    drinksTile: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 10,
      margin: 2.5,
      backgroundColor: '#0696E9',
    },
    drinkIcon: {
      color: 'white',
    },
    logo: {
      width: windowWidth - 40,
      height: 200,
      marginLeft: 20,
    },
    hours: {
      backgroundColor: "whitesmoke",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    hours_title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    hours_text: {
      fontSize: 16,
    },
    reportButton: {
      marginHorizontal: 50
    }
  });

export default styles;