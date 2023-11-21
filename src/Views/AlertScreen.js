//
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Switch } from "react-native";

import { client } from "../MqttConnect";
import { username } from "../Model";
import { getData0, postData } from "../Controller";

function AlertScreen() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [alert, setAlert] = useState("");
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
      if (cur.destinationName === username + "/feeds/iot.sensor3") {
        const newAlert = cur.payloadString;
        setAlert((prevAlerts) => [...prevAlerts, newAlert]);
        console.log(newAlert);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {alerts.map((alert, index) => (
        <View key={index} style={styles.alertContainer}>
          <Text style={styles.alertText}>{alert}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: 150,
    backgroundColor: "#2A2A37",
    borderRadius: 10,
    marginBottom: 20,
  },
  fanContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: 150,
    backgroundColor: "#2A2A37",
    borderRadius: 10,
  },
  basetext: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    paddingLeft: "5%",
  },
  statetext: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    paddingRight: "5%",
  },
};

export default AlertScreen;
