# pylint: skip-file
from repositories.DataRepository import DataRepository
from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS

import time
import threading
import datetime
import subprocess

import spidev
import os

from RPi import GPIO
from RPLCD import CharLCD

relay = 4

GPIO.setmode(GPIO.BCM)
GPIO.setup(relay, GPIO.OUT)


def LCD_screen():
    while True:
        lcd = CharLCD(cols=16, rows=2, pin_rs=19, pin_e=26, numbering_mode=GPIO.BCM,
                      pins_data=[17, 27, 22, 5, 12, 25, 24, 23])
        string = (subprocess.check_output(
            ["hostname", "-I"]).split()[1]).decode('ascii')
        lcd.write_string(f'{string}')
        time.sleep(30)
        lcd.clear()


def automatic_toggle():
    while True:
        status = ""
        moist = ReadChannel(0)
        if moist <= 10:
            GPIO.output(relay, GPIO.HIGH)
            status = "ON"
            DataRepository.insert_status(status)
            socketio.emit('B2F_toggle_status', {'status': status})
            time.sleep(3600)
        current_status = GPIO.input(relay)
        if current_status == 1:
            GPIO.output(relay, GPIO.LOW)
            status = "OFF"
            DataRepository.insert_status(status)
            socketio.emit('B2F_toggle_status', {'status': status})
            time.sleep(1)


# led1 = 21
# knop1 = Button(20)

# GPIO.setwarnings(False)
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(led1, GPIO.OUT)

# Open SPI bus
spi = spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz = 1000000


def ReadChannel(channel):
    adc = spi.xfer2([1, (8+channel) << 4, 0])
    data = ((adc[1] & 3) << 8) + adc[2]
    return data


app = Flask(__name__)
app.config['SECRET_KEY'] = 'Hier mag je om het even wat schrijven, zolang het maar geheim blijft en een string is'

socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)


# API ENDPOINTS
@app.route('/')
def hallo():
    return "Server is running, er zijn momenteel geen API endpoints beschikbaar."


# SOCKET IO
@socketio.on('connect')
def initial_connection():
    print('A new client connected')
    moistPercent = DataRepository.lees_waarde_sensor_by_id('MOIST')
    socketio.emit('B2F_vochtigheid', {'vochtigheid': moistPercent})
    tempCelsius = DataRepository.lees_waarde_sensor_by_id('TEMP')
    socketio.emit('B2F_temperatuur', {'temperatuur': tempCelsius})
    watermm = DataRepository.lees_waarde_sensor_by_id('WATER')
    socketio.emit('B2F_waterniveau', {'waterniveau': watermm})
    logs = DataRepository.lees_logs()
    socketio.emit('B2F_logs', {'logs': logs})
    tempGrafiek = DataRepository.lees_temperatuur_grafiek()
    socketio.emit('B2F_temperatuur_grafiek', {'temp_grafiek': tempGrafiek})
    waterGrafiek = DataRepository.lees_water_grafiek()
    socketio.emit('B2F_water_grafiek', {'water_grafiek': waterGrafiek})
    vochtigheidGrafiek = DataRepository.lees_vochtigheid_grafiek()
    socketio.emit('B2F_vochtigheid_grafiek', {
                  'vochtigheid_grafiek': vochtigheidGrafiek})
    status = DataRepository.lees_status()
    socketio.emit('B2F_status', {'status': status})


@socketio.on('F2B_vochtigheid')
def lees_vochtigheid():
    while True:
        print("Inlezen van de vochtigheid")
        moist = ReadChannel(0)
        moistPercent = round((moist / 1023) * 100)
        DataRepository.update_waarde_sensor_by_id('MOIST', moistPercent)
        socketio.emit('B2F_vochtigheid', {'vochtigheid': moistPercent})
        time.sleep(3600)


@socketio.on('F2B_vochtigheid_manual')
def lees_vochtigheid_manual():
    print("Inlezen van de vochtigheid (manual)")
    moist = ReadChannel(0)
    moistPercent = round((moist / 1023) * 100)
    DataRepository.update_waarde_sensor_by_id('MOIST', moistPercent)
    socketio.emit('B2F_vochtigheid', {'vochtigheid': moistPercent})


@socketio.on('F2B_temperatuur')
def lees_temperatuur():
    while True:
        print("Inlezen van de temperatuur")
        temp = ReadChannel(1)
        tempCelsius = round(((temp * 330) / 1023), 1)
        DataRepository.update_waarde_sensor_by_id('TEMP', tempCelsius)
        socketio.emit('B2F_temperatuur', {'temperatuur': tempCelsius})
        time.sleep(3600)


@socketio.on('F2B_temperatuur_manual')
def lees_temperatuur_manual():
    print("Inlezen van de temperatuur (manual)")
    temp = ReadChannel(1)
    tempCelsius = round(((temp * 330) / 1023), 1)
    DataRepository.update_waarde_sensor_by_id('TEMP', tempCelsius)
    socketio.emit('B2F_temperatuur', {'temperatuur': tempCelsius})


@socketio.on('F2B_waterniveau')
def lees_waterniveau():
    while True:
        print("Inlezen van het waterniveau")
        waterlevel = ReadChannel(2)

        watermm = ""

        if waterlevel <= 440:
            watermm = 0
        if waterlevel >= 440 and waterlevel <= 490:
            watermm = 5
        if waterlevel >= 490 and waterlevel <= 530:
            watermm = 10
        if waterlevel >= 530 and waterlevel <= 550:
            watermm = 15
        if waterlevel >= 550 and waterlevel <= 565:
            watermm = 20
        if waterlevel >= 565 and waterlevel <= 575:
            watermm = 25
        if waterlevel >= 575 and waterlevel <= 580:
            watermm = 30
        if waterlevel >= 580 and waterlevel <= 585:
            watermm = 35
        if waterlevel >= 585:
            watermm = 40
        DataRepository.update_waarde_sensor_by_id('WATER', watermm)
        socketio.emit('B2F_waterniveau', {'waterniveau': watermm})
        time.sleep(300)


@socketio.on('F2B_waterniveau_manual')
def lees_waterniveau_manual():
    print("Inlezen van het waterniveau")
    waterlevel = ReadChannel(2)

    watermm = ""

    if waterlevel <= 440:
        watermm = 0
    if waterlevel >= 440 and waterlevel <= 490:
        watermm = 5
    if waterlevel >= 490 and waterlevel <= 530:
        watermm = 10
    if waterlevel >= 530 and waterlevel <= 550:
        watermm = 15
    if waterlevel >= 550 and waterlevel <= 565:
        watermm = 20
    if waterlevel >= 565 and waterlevel <= 575:
        watermm = 25
    if waterlevel >= 575 and waterlevel <= 580:
        watermm = 30
    if waterlevel >= 580 and waterlevel <= 585:
        watermm = 35
    if waterlevel >= 585:
        watermm = 40
    DataRepository.update_waarde_sensor_by_id('WATER', watermm)
    socketio.emit('B2F_waterniveau', {'waterniveau': watermm})


@socketio.on('F2B_toggle_status')
def toggle_status(status):
    if status.get('status') == 'OFF':
        GPIO.output(relay, GPIO.LOW)
    if status.get('status') == 'ON':
        GPIO.output(relay, GPIO.HIGH)
    DataRepository.insert_status(status.get('status'))
    socketio.emit('B2F_toggle_status', {'status': status})


threading.Timer(1, lees_vochtigheid).start()
threading.Timer(2, lees_temperatuur).start()
threading.Timer(3, lees_waterniveau).start()
threading.Timer(4, LCD_screen).start()
threading.Timer(5, automatic_toggle).start()

if __name__ == '__main__':
    socketio.run(app, debug=False, host='0.0.0.0')
