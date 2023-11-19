//
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Switch } from "react-native";

import { client } from "../MqttConnect";
import { username } from "../Model";
import { getData0, postData } from "../Controller";

function AutomaticScreen() {
  const [isLightUse, setIsLightUse] = useState(false);
  const [isFanUse, setIsFanUse] = useState(false);

  useEffect(() => {
    getData0("iot.button1").then((data) => {
      setIsLightUse(data == 0 ? false : true);
    });
    getData0("iot.button2").then((data) => {
      setIsFanUse(data == 0 ? false : true);
    });
  }, []);

  useEffect(() => {
    client.onMessageArrived = (cur) => {
      console.log(cur);
      if (cur.destinationName == username + "/feeds/iot.button1") {
        setIsLightUse(cur.payloadString == 0 ? false : true);
      }
      if (cur.destinationName == username + "/feeds/iot.button2") {
        setIsFanUse(cur.payloadString == 0 ? false : true);
      }
    };
  }, []);

  const lightToggleSwitch = () => {
    const message = isLightUse ? "0" : "1";
    let qos = 1;
    // client.send(username + "/feeds/control", message, qos);
    client.send(username + "/feeds/iot.button1", message, qos);
  };
  const fanToggleSwitch = () => {
    const message = isFanUse ? "0" : "1";
    let qos = 1;
    // client.send(username + "/feeds/control", message, qos);
    client.send(username + "/feeds/iot.button2", message, qos);
  };

  return (
    <View style={styles.container}>
      <View style={styles.lightContainer}>
        <Text style={styles.basetext}>Đèn</Text>
        <Text style={styles.statetext}>{isLightUse ? "ON" : "OFF"}</Text>
        <View>
          <Switch
            style={{ marginHorizontal: 10 }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isLightUse ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={lightToggleSwitch}
            value={isLightUse}
          />
        </View>
      </View>
      <View style={styles.fanContainer}>
        <Text style={styles.basetext}>Quạt</Text>
        <Text style={styles.statetext}>{isFanUse ? "ON" : "OFF"}</Text>
        <View>
          <Switch
            style={{ marginHorizontal: 10 }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isFanUse ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={fanToggleSwitch}
            value={isFanUse}
          />
        </View>
      </View>
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

export default AutomaticScreen;
