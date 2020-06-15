import spidev
import time
import os

# Open SPI bus
spi = spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz = 1000000


def ReadChannel(channel):
    adc = spi.xfer2([1, (8+channel) << 4, 0])
    data = ((adc[1] & 3) << 8) + adc[2]
    return data


while True:
    moist = ReadChannel(0)
    temp = ReadChannel(1)
    tempCelsius = (temp * 330) / 1023

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

    # Print out results
    print(f"Moisture: {moist}")
    print(f"Temperature: {tempCelsius}")
    print(f"Water Level: {watermm}")
    time.sleep(1)

# from RPLCD import CharLCD
# from RPi import GPIO

# lcd = CharLCD(cols=16, rows=2, pin_rs=19, pin_e=26, numbering_mode=GPIO.BCM,
#               pins_data=[17, 27, 22, 5, 12, 25, 24, 23])
# lcd.write_string(u'192.168.0.107')

# from RPi import GPIO

# relay = 4

# GPIO.setmode(GPIO.BCM)
# GPIO.setup(relay, GPIO.OUT)

# GPIO.output(relay, GPIO.LOW)
