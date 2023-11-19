import { Client } from "paho-mqtt";
import { username, apiKey } from "./Model";

const url = "io.adafruit.com/ws";
const port = 8883;
const topictemp = "/feeds/iot.sensor1";
const topichumi = "/feeds/iot.sensor2";
const topiclight = "/feeds/iot.sensor3";
const lightswitch = "/feeds/iot.button1";
const fanswitch = "/feeds/iot.button2";
// const control = "/feeds/control";

const client = new Client(url, port, "1914616");
client.onConnectionLost = (responseObject) => {
  console.log("Connection lost: " + responseObject.errorMessage);
};
client.onMessageArrived = (message) => {
  console.log(
    "Message received: " +
      message.payloadString +
      " on topic: " +
      message.destinationName
  );
};

const options = {
  userName: username,
  password: apiKey,
  useSSL: true,
  onSuccess: () => {
    const suboptions = {
      qos: 1,
    };
    console.log("Connected to MQTT broker");
    client.subscribe(username + topictemp, suboptions);
    client.subscribe(username + topichumi, suboptions);
    client.subscribe(username + topiclight, suboptions);
    client.subscribe(username + lightswitch, suboptions);
    client.subscribe(username + fanswitch, suboptions);

    // client.subscribe(username + control, suboptions);
  },
  onFailure: (err) =>
    console.log("Failed to connect to MQTT broker", err.errorMessage),
};

client.connect(options);

export { client };
