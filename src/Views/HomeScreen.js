// //
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { username, apiKey } from "../Model";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { client } from "../MqttConnect";
import { getData0, postData, getData } from "../Controller";

function HomeScreen() {
  if (!client.isConnected) {
    client.connect();
  }
  // client.connect();

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [curtemp, setTemp] = useState("");
  const [curhumi, setHumi] = useState("");
  const [curlight, setLight] = useState("");
  useEffect(() => {
    getData0("iot.sensor1").then((data) => {
      setTemp(data);
    });
    getData0("iot.sensor2").then((data) => {
      setHumi(data);
    });
    getData0("iot.sensor3").then((data) => {
      setLight(data);
    });
  }, []);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(date + "/" + month + "/" + year);
  }, []);
  useEffect(() => {
    var hours = String(new Date().getHours()); //Current Hours
    var min = String(new Date().getMinutes()); //Current Minutes
    if (hours.length == 1) {
      hours = "0" + hours;
    }
    if (min.length == 1) {
      min = "0" + min;
    }
    setCurrentTime(hours + ":" + min);
  }, []);

  useEffect(() => {
    client.onMessageArrived = (cur) => {
      console.log(cur);
      if (cur.destinationName == username + "/feeds/iot.sensor1") {
        setTemp(cur.payloadString);
        console.log(cur.payloadString);
      }
      if (cur.destinationName == username + "/feeds/iot.sensor2") {
        setHumi(cur.payloadString);
        console.log(cur.payloadString);
      }
      if (cur.destinationName == username + "/feeds/iot.sensor3") {
        setLight(cur.payloadString);
        console.log(cur.payloadString);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <Text style={styles.baseText}>Overview</Text>
        <View style={styles.overviewContent}>
          <View style={styles.overviewItemLeft}>
            <MaterialIcons name="wb-sunny" color={"white"} size={30} />
            <Text style={styles.timeText}> {currentTime}</Text>
            <Text style={styles.dateText}> {currentDate}</Text>
          </View>
          <View style={styles.overviewItemRight}>
            <View display="flex" flexDirection="row">
              <FontAwesome5
                name="temperature-low"
                paddingLeft="7%"
                color={"white"}
                size={40}
              />
              <Text style={styles.dataText}>{curtemp + "°C"} </Text>
            </View>
            <View display="flex" flexDirection="row">
              <Ionicons
                name="water-outline"
                paddingTop="20%"
                color={"white"}
                size={40}
                fontWeight="bold"
              />
              <Text style={styles.dataText} paddingTop="20%">
                {curhumi + "%"}{" "}
              </Text>
            </View>
            <View display="flex" flexDirection="row">
              <Entypo
                name="light-up"
                paddingTop="20%"
                color={"white"}
                size={40}
                fontWeight="bold"
              />
              <Text style={styles.dataText} paddingTop="20%">
                {curlight + "lx"}{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  overview: {
    backgroundColor: "#2A2A37",
    display: "flex",
    flexDirection: "column",
    height: "35%",
    width: "100%",
    borderRadius: 20,
  },
  baseText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    paddingLeft: "5%",
  },
  overviewContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  overviewItemLeft: {
    paddingLeft: "5%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "90%",
    width: "60%",
  },
  overviewItemRight: {
    paddingLeft: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "90%",
    width: "30%",
  },
  timeText: {
    // paddingRight:"5%",
    fontWeight: "bold",
    color: "white",
    fontSize: 60,
  },
  dateText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  dataText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
});
export default HomeScreen;
