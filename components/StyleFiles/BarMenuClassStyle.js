import {StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button_container: {
      flex: 1,
      height: 50,
      width: 50,
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

    }
  });
  
  export default styles;