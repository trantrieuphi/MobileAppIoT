// Path: src\Controller\index.js
import axios from "axios";

import { username, apiKey } from "../Model";

const getData = async (feed) => {
  try {
    const res = await fetch(
      `https://io.adafruit.com/api/v2/${username}/feeds/${feed}/data`,
      {
        headers: {
          "X-AIO-Key": apiKey,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getData0 = async (feed) => {
  try {
    const res = await fetch(
      `https://io.adafruit.com/api/v2/${username}/feeds/${feed}/data`,
      {
        headers: {
          "X-AIO-Key": apiKey,
        },
      }
    );
    const data = await res.json();
    const value = data[0].value;
    return value;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (feed, value) => {
  try {
    const res = await axios.post(
      `https://io.adafruit.com/api/v2/${username}/feeds/${feed}/data`,
      {
        value: value,
      },
      {
        headers: {
          "X-AIO-Key": apiKey,
        },
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { getData, getData0, postData };
