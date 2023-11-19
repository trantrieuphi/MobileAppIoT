import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import ChartUI from "../ChartUI";
import { getData0 } from "../Controller";
import { client } from "../MqttConnect";
import { username, apiKey } from "../Model";

function ChartScreen() {
  const [tempData, setTempData] = useState([]);
  const [humiData, setHumiData] = useState([]);

  useEffect(() => {
    getData0("iot.sensor1").then((data) => {
      setTempData(data.slice(0, 30));
    });
    getData0("iot.sensor2").then((data) => {
      setHumiData(data.slice(0, 30));
    });
  }, []);

  useEffect(() => {
    client.onMessageArrived = (cur) => {
      if (cur.destinationName == username + "/feeds/iot.sensor1") {
        setTempData((prev) => {
          if (prev.length >= 30) {
            prev.shift();
          }
          return [...prev, cur.payloadString];
        });
      }
      if (cur.destinationName == username + "/feeds/iot.sensor2") {
        setHumiData((prev) => {
          if (prev.length >= 30) {
            prev.shift();
          }
          return [...prev, cur.payloadString];
        });
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.text}>
        <Text style={styles.text}>Biểu đồ nhiệt độ</Text>
        <ChartUI data={tempData} type="°C" />
      </View>
      <View style={styles.text}>
        <Text style={styles.text}>Biểu đồ độ ẩm</Text>
        <ChartUI data={humiData} type="%" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
    alignItems: "center",
  },
});

export default ChartScreen;
