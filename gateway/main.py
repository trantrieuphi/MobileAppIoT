
import random
import time
import sys
import cv2
from simpleAi import *
from Adafruit_IO import MQTTClient
from uart import *

AIO_FEED_IDS = ["iot.button1", "iot.button2"]
AIO_USERNAME = "trantrieuphi"
AIO_KEY = "aio_pQES52A6rGzrgUTcuG1qw0r7zs5c"

def  connected(client):
    print("Ket noi thanh cong...")
    for topic in AIO_FEED_IDS:
        client.subscribe(topic)
    client.subscribe(AIO_FEED_IDS)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)


def  message(client , feed_id , payload):
    print("Nhan du lieu: " + payload + " - Feed id:" + feed_id)
    if feed_id == "iot.button1":
        if payload == "0":
            client.cur_led = "0"
            writeSerial("0")
        else:
            writeSerial("1")
            client.cur_led = "1"
    if feed_id == "iot.button2":
        if payload == "0":
            client.cur_fan = "2"
            writeSerial("2")
        else:
            client.cur_led = "3"
            writeSerial("3")

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

ON = "1";
OFF = "0";
LED_ON = "1"
LED_OFF = "0"
FAN_ON = "3"
FAN_OFF = "2"

ai_init = "nobody"
client.cur_led = LED_OFF
client.cur_fan = FAN_OFF
client.cur_temp = "0"
client.cur_hum = "0"
client.cur_light = "500"
counter = 10
counter_ai = 5
sensor_type = 0
ai_result = ""
pre_ai_result = ""
while True:
    counter_ai = counter_ai - 1
    if counter_ai <= 0:
        counter_ai = 5
        pre_ai_result = ai_result
        ai_result = image_detector()

        # print("giá trị led:" + client.cur_led)
        print("gia tri temp: " + client.cur_temp)
        print("AI Output: " + ai_result)

        if ai_result != pre_ai_result:
            if ai_result != "nobody\n":
                if client.cur_fan == FAN_OFF and int(client.cur_temp) >= 34:
                    print("Bật quạt!")
                    client.publish("iot.button2", ON)
                    client.cur_fan = FAN_ON
                    writeSerial(FAN_ON)
                if client.cur_led == LED_OFF and int(client.cur_light) < 100:
                    print("Bật đèn!")
                    client.publish("iot.button1", ON)
                    client.cur_led = LED_ON
                    writeSerial(LED_ON)
            client.publish("iot.ai", ai_result)
    readSerial(client)

    # keyboard_input = cv2.waitKey(1)
    # if keyboard_input == 27:
    #     break

    time.sleep(1)
