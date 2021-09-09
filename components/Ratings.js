import { View } from "native-base";
import React, { Component } from "react";
import { createPortal } from "react-dom";
import {Text, StyleSheet, ActivityIndicator} from "react-native";
import ProgressCircle from "react-native-progress-circle";

export default class Ratings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewSource: [],
            loading: true,
        };
      }

    componentDidMount() {
        fetch("https://barpedia.herokuapp.com/api/reviews/")
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              reviewSource: responseData,
              loading: false,
            });
          })
          .catch((error) => console.log(error)); //to catch the errors if any
      }
    
      render() {
        if (this.state.loading) {
            return (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0c9" />
              </View>
            );
        }
        const bar_reviews = this.state.reviewSource.find((element) => {
            return element.id === this.props.barId;
          });
        //Percent has to be 1-rating because the circle fills the opposite way
        return (   
            <View style={styles.circles}>
                <View style={styles.individual}>    
                    <ProgressCircle
                        percent={100-bar_reviews.food*20}
                        radius={50}
                        borderWidth={8}
                        color="#dddddd"
                        shadowColor="#3399FF"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{bar_reviews.food}</Text>
                    </ProgressCircle>
                    <Text>Food Quality</Text>
                </View>
                <View style={styles.individual}>    
                    <ProgressCircle
                        percent={100-bar_reviews.drink*20}
                        radius={50}
                        borderWidth={8}
                        color="#dddddd"
                        shadowColor="#3399FF"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{bar_reviews.drink}</Text>
                    </ProgressCircle>
                    <Text>Drink Quality</Text>
                </View>
                <View style={styles.individual}>    
                    <ProgressCircle
                        percent={100-bar_reviews.service*20}
                        radius={50}
                        borderWidth={8}
                        color="#dddddd"
                        shadowColor="#3399FF"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{bar_reviews.service}</Text>
                    </ProgressCircle>
                    <Text>Service</Text>
                </View>
                <View style={styles.individual}>    
                    <ProgressCircle
                        percent={100-bar_reviews.price*20}
                        radius={50}
                        borderWidth={8}
                        color="#dddddd"
                        shadowColor="#3399FF"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{bar_reviews.price}</Text>
                    </ProgressCircle>
                    <Text>Cost</Text>
                </View>
                <View style={styles.individual}>    
                    <ProgressCircle
                        percent={100-bar_reviews.noise*20}
                        radius={50}
                        borderWidth={8}
                        color="#dddddd"
                        shadowColor="#3399FF"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{bar_reviews.noise}</Text>
                    </ProgressCircle>
                    <Text>Loudness</Text>
                </View>
                <View style={styles.individual}>    
                    <ProgressCircle
                        percent={100-bar_reviews.atmosphere*20}
                        radius={50}
                        borderWidth={8}
                        color="#dddddd"
                        shadowColor="#3399FF"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{bar_reviews.atmosphere}</Text>
                    </ProgressCircle>
                    <Text>Atmosphere</Text>
                </View>
            </View>
        );          
    }
}

const styles = StyleSheet.create({
    circles: {
        marginVertical: 24,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center'
    },
    individual: {
        flexDirection: "column",
        alignItems: "center",
        margin: 10,
    }
})
