import {StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    modal: {
      flex: 1,
      marginTop: 50,
      marginBottom: 10,
      flexDirection: "column",
      alignItems: "center",
    },
    modal_title: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center"
    },
    demo: {
      resizeMode: "contain",
      marginVertical: 10,
      height: windowHeight/1.3,
      width: windowWidth - 40,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    list: {
      paddingVertical: 2,
      margin: 5,
      backgroundColor: "#fff",
    },
    logo: {
      width: windowWidth - 40,
      height: 200,
      marginLeft: 20,
    },
    comments: {
      alignItems: "center",
      padding: 5,
    },
    button: {
      flex: 1,
      justifyContent: "center",
      borderRadius: 20,
      width: 200,
      height: 50,
      padding: 10,
      backgroundColor: "#2196F3",

    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  
  export default styles;