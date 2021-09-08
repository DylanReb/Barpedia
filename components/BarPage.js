import React, { useState, Component } from "react";
import {
  Button,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { Icon } from "native-base";
import { Accordion } from "native-base";
import EventsSpecials from "./AccordionFiles/specialsAccordion.js";
import picture_linker from "./PictureLinkers/picture_linker.js";
import HappyHour from "./AccordionFiles/happyHourAccordion.js";
import Everyday from "./AccordionFiles/everydayAccordion.js";
import Entertainment from "./AccordionFiles/entertainmentAccordion";
import logo from "../assets/Barpedia_logo.png";
import { render } from "react-dom";
import CoverChargeModal from "./CoverChargeModal.js";
import Timer from "./Timer.js";
import styles from "./StyleFiles/BarPageStyle.js";
import Ratings from "./Ratings.js";


var lineLength = [
  {
    0: "No Wait",
    1: "5-10 Minutes",
    2: "11-30 Minutes",
    3: "Longer than 30 Minutes",
  },
];

export default class BarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barName: this.props.route.params.name,
      coverCharge: this.props.route.params.coverCharge,
      dataSource: [],
      everydaySource: [],
      entertainSource: [],
      happySource: [],
      specialSource: [],
      listener: this.props.route.params.listenerprop,
      loading: true,
    };
  }
  componentDidMount() {
    //fetch("http:/192.168.0.5:3000/linedata")
    Promise.all([
      fetch("https://barpedia.herokuapp.com/api/bars/").then((response) => response.json()),
      fetch("https://barpedia.herokuapp.com/api/everyday/").then((response) => response.json()),
      fetch("https://barpedia.herokuapp.com/api/entertainment/").then((response) => response.json()),
      fetch("https://barpedia.herokuapp.com/api/happyhour/").then((response) => response.json()),
      fetch("https://barpedia.herokuapp.com/api/specials/").then((response) => response.json()),
      fetch("https://barpedia.herokuapp.com/api/messages/").then((response) => response.json())
    ]).then(([responseData1, responseData2, responseData3, responseData4, responseData5, responseData6]) => {
      this.setState({
        dataSource: responseData1,
        everydaySource: responseData2,
        entertainSource: responseData3,
        happySource: responseData4,
        specialSource: responseData5,
        messageSource: responseData6,
        loading: false
      });
    })
      .catch((error) => console.log(error)); //to catch the errors if any
  }

  componentDidUpdate() {
    if (this.state.loading) {
      fetch("https://barpedia.herokuapp.com/api/bars/")
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            loading: false,
            dataSource: responseData,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.route.params.listenerprop !== prevState.listener) {
      return (
        (prevState.listener = nextProps.route.params.listenerprop),
        (prevState.loading = true)
      );
    } else return false;
  }
  _renderDaily = (item) => {
    return <EventsSpecials name={this.state.barName} data={this.state.specialSource}></EventsSpecials>;
  };

  _renderDailyHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginHorizontal: 5
      }}>
        <Text style={{ fontWeight: "600" }}>
          Daily Specials
        </Text>
        {expanded
          ? <Icon type="AntDesign" style={{ fontSize: 18 }} name="up" />
          : <Icon type="AntDesign" style={{ fontSize: 18 }} name="down" />}
      </View>
    );
  }

  _renderEveryday = (item) => {
    return <Everyday name={this.state.barName} data={this.state.everydaySource}></Everyday>;
  };

  _renderEveryHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginHorizontal: 5
      }}>
        <Text style={{ fontWeight: "600" }}>
          All Day Everyday
        </Text>
        {expanded
          ? <Icon type="AntDesign" style={{ fontSize: 18 }} name="up" />
          : <Icon type="AntDesign" style={{ fontSize: 18 }} name="down" />}
      </View>
    );
  }

  _renderHappyHour = (item) => {
    return <HappyHour name={this.state.barName} data={this.state.happySource}></HappyHour>;
  };

  _renderHappyHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginHorizontal: 5
      }}>
        <Text style={{ fontWeight: "600" }}>
          Happy Hours
        </Text>
        {expanded
          ? <Icon type="AntDesign" style={{ fontSize: 18 }} name="up" />
          : <Icon type="AntDesign" style={{ fontSize: 18 }} name="down" />}
      </View>
    );
  }

  _renderEntertainment = (item) => {
    return <Entertainment name={this.state.barName} data={this.state.entertainSource}></Entertainment>;
  };

  _renderEnterHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginHorizontal: 5
      }}>
        <Text style={{ fontWeight: "600" }}>
          Entertainment
        </Text>
        {expanded
          ? <Icon type="AntDesign" style={{ fontSize: 18 }} name="up" />
          : <Icon type="AntDesign" style={{ fontSize: 18 }} name="down" />}
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    const bar_data = this.state.dataSource.find((element) => {
      return element.name === this.state.barName;
    });
    const barspec = this.state.specialSource.find((element) => {
      return element.name === this.state.barName;
    });
    const barenter = this.state.entertainSource.find((element) => {
      return element.name === this.state.barName;
    });
    const barevery = this.state.everydaySource.find((element) => {
      return element.name === this.state.barName;
    });
    const barhappy = this.state.happySource.find((element) => {
      return element.name === this.state.barName;
    });
    const barmessage = this.state.messageSource.find((element) => {
      return element.name === this.state.barName;
    });
    const barpic = this.props.route.params.barPic;
    const bar_link = picture_linker.getBarLink(barpic);
    var dailyArray = [{ title: "Daily Specials", content: "" }];
    var entertainArray = [{ title: "Entertainment", content: "" }];
    var everydayArray = [{ title: "All Day Everyday", content: "" }];
    var happyArray = [{ title: "Happy Hours", content: "" }];
    const dataArray = [
      { title: "Daily Specials", content: "" },
      { title: "Entertainment", content: "" },
      { title: "All Day Everyday", content: "" },
      { title: "Happy Hours", content: "" }
    ];
    if (barspec.available == false) {
      dailyArray = [
        { title: "Daily Specials (not available at this bar)", content: "" },
      ];
    }
    if (barenter.available == false) {
      entertainArray = [
        { title: "Entertainment (not available at this bar)", content: "" },
      ];
    }
    if (barevery.available == false) {
      everydayArray = [
        { title: "All Day Everyday (not available at this bar)", content: "" },
      ];
    }
    if (barhappy.available == false) {
      happyArray = [
        { title: "Happy Hours (not available at this bar)", content: "" },
      ];
    }

    const canReportLine = true;
    var closed;
    var button;
    if (bar_data.lineleap) {
      closed = (
        <View style={styles.line_and_cover}>
          <Text style={styles.line_and_cover_text}>
            A pass must be purchased on lineleap
          </Text>
        </View>
      )
    }
    else if (!bar_data.closed) {
      if (barmessage.available) {
        closed = (
          <View style={styles.line_and_cover}>
            <Text style={styles.line_and_cover_text}>
              Special event: {barmessage.message}
            </Text>
          </View>
        )
      }
      else {
        closed = (
          <View style={styles.line_and_cover}>
            <Text style={styles.line_and_cover_text}>
              Approx wait is: {lineLength[0][bar_data.line]}
            </Text>
            <Text style={styles.line_and_cover_text}>
              The cover charge is ${bar_data.coverCharge}
            </Text>
          </View>
        )
      }
    }
    else if (bar_data.closed) {
      closed = (
        <View style={styles.line_and_cover}>
          <Text style={styles.line_and_cover_text}>
            This bar is currently closed
          </Text>
        </View>
      )
    }
    return (
      <>
        <ScrollView style={styles.scroll} scrollIndicatorInsets={{ right: 1 }}>
          <View style={styles.box}>
            <ImageBackground style={styles.pageImage} imageStyle={{ borderRadius: 15 }} source={bar_link}>
              <View style={styles.titleBox}>
                <Text style={styles.barTitle}>
                  {this.props.route.params.name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <Timer
            barName={this.props.route.params.name}
            lineLeap={bar_data.lineleap}
            Review="0"
            onPress={() =>
              this.props.navigation.navigate("Line Reporting", {
                name: this.props.route.params.name,
                id: this.props.route.params.id,
                listen: this.state.listener,
              })
            }
          ></Timer>
          <Timer
            barName={this.props.route.params.name}
            lineLeap={bar_data.lineleap}
            Review="1"
            onPress={() =>
              this.props.navigation.navigate("Reviews", {
                name: this.props.route.params.name,
                id: this.props.route.params.id,
              })
            }
          ></Timer>
          {closed}
          <Accordion
            expanded={[]}
            dataArray={dailyArray}
            style={styles.accordion}
            headerStyle={styles.accordionHeader}
            renderContent={this._renderDaily}
            renderHeader={this._renderDailyHeader}
          ></Accordion>
          <Accordion
            dataArray={entertainArray}
            renderContent={this._renderEntertainment}
            renderHeader={this._renderEnterHeader}
            style={styles.accordion}
            headerStyle={styles.accordionHeader}
            expanded={[]}
          ></Accordion>
          <Accordion
            dataArray={everydayArray}
            style={styles.accordion}
            headerStyle={styles.accordionHeader}
            renderContent={this._renderEveryday}
            renderHeader={this._renderEveryHeader}
            expanded={[]}
          ></Accordion>
          <Accordion
            dataArray={happyArray}
            style={styles.accordion}
            headerStyle={styles.accordionHeader}
            renderContent={this._renderHappyHour}
            renderHeader={this._renderHappyHeader}
            expanded={[]}
          ></Accordion>
          <Ratings
            barId={bar_data.id}>
          </Ratings>
          <View style={styles.menuandDrinkTile}>
            <TouchableHighlight
              style={styles.menuTile}
              onPress={() =>
                this.props.navigation.navigate("Bar Food", {
                  name: this.props.route.params.name,
                })
              }
            >
              <View style={styles.menuTile}>
                <Text style={styles.title}>Menu</Text>
                <Icon name='book-open' type='FontAwesome5' style={styles.menuIcon}></Icon>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.drinksTile}
              onPress={() =>
                this.props.navigation.navigate("Bar Drinks", {
                  name: this.props.route.params.name,
                })
              }
            >
              <View style={styles.drinksTile}>
                <Text style={styles.title}>Drinks</Text>
                <Icon name='cocktail' type='FontAwesome5' style={styles.drinkIcon}></Icon>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.hours}>
            <Text style={styles.hours_title}> Bar Hours: </Text>
            <Text style={styles.hours_text}>
              Monday: {bar_data.hours.Monday}
            </Text>
            <Text style={styles.hours_text}>
              Tuesday: {bar_data.hours.Tuesday}
            </Text>
            <Text style={styles.hours_text}>
              Wednesday: {bar_data.hours.Wednesday}
            </Text>
            <Text style={styles.hours_text}>
              Thursday: {bar_data.hours.Thursday}
            </Text>
            <Text style={styles.hours_text}>
              Friday: {bar_data.hours.Friday}
            </Text>
            <Text style={styles.hours_text}>
              Saturday: {bar_data.hours.Saturday}
            </Text>
            <Text style={styles.hours_text}>
              Sunday: {bar_data.hours.Sunday}
            </Text>
          </View>
          <Image style={styles.logo} source={logo}></Image>
        </ScrollView>
      </>
    );
  }
}
