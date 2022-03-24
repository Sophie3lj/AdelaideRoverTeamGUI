#!/usr/bin/python3

import time
import serial

"""
Code by Monash Nova Rover
"""


class FleetInterface:
    def __init__(self, port="/dev/ttyUSB0"):
        self.ser = serial.Serial(port=port, baudrate=115200, timeout=1)
        if not self.ser.isOpen():
            print("Connection not open")
            raise Exception("Connection to modem not established.")

        # If port is open
        else:
            print("Connection is open!")
        self.AT = "AT"

    def read(self):
        """
        Wait 5 seconds before reading content from the modem
        :return:
        """
        time.sleep(.5)
        # return str(self.serial.readlines()[1][:-2])
        return self.ser.readlines()

    def write(self, msg: str):
        """
        Sends data to modem by writing to serial
        :param msg: data excluding
        :return:
        """
        s = self.AT + "%" + msg + "\r\n"
        print("SENDING: " + s)
        self.ser.write(bytes(s, "UTF-8"))
    
    def get_ok_response(self):
        response = self.read()
        print(response)
        try:
            if response[1] == b'OK\r\n':
                return True
            else:
                return False
        except Exception as e:
            print("Failed to get Ok response: " + str())
            print("Exception: " + str(e))
            return False

    def request_modem_status(self):
        """
        Implements a FTMS command
        :return: True if result code ok, False otherwise
        """
        self.write("FTMS")

    def transmit_message(self, data,
                         identifier: str = "TestMsg",
                         priority: int = 1,
                         data_format: type = str):
        """
        :todo: implement other data formats :D
        Implements the FTTM interface
        :param identifier: string as a unique identifier of the payload
        :param priority: integer denoting priority (0 - 5)
        :param data_format: type of data
        :param data: data to send with the format data_format
        :return: True if result code ok, False otherwise
        """

        assert type(data) == data_format

        format_int = 1
        if data_format == str:
            format_int = 1

        msg = 'FTTM="' + str(identifier) + '",' + str(priority) \
              + ',' + str(format_int) + ',"' + data + '"'

        self.write(msg)

    def get_incoming_message_data(self, identifier: str = "test", data_format: type = str):
        format_int = 1
        if data_format == str:
            format_int = 1

        msg = 'FTRG="' + str(identifier) + '",' + str(format_int)

        self.write(msg)

    def get_transmission_status(self, identifier=None):
        """
        Gets the statuses of all messages
        :return: None
        """

        if not identifier:
            self.write("FTTS")
        else:
            self.write("FTTS:" + '"' + identifier + '",')

    def request_received_message(self):
        """
        Queries the modem for any recently received messages which have not yet been
        received by the client
        :return:
        """
        self.write("FTRS")

    def get_logs(self):
        """
        Uses EROSLOGS to get logs from satellite
        :return:
        """
        self.write("EROSLOGS")


def main():
    i = FleetInterface()

    # get status of modem
    print(i.request_modem_status())
    print(i.read())

    identifier = "test-" + str(time.time())

    # send message
    i.transmit_message("Hello", identifier=identifier)
    print(i.read())

    # get status of messages
    i.get_transmission_status()
    print(i.read())

    # get message data
    i.get_incoming_message_data(identifier, str)
    print(i.read())

    i.write("EROSLOGS")
    print(i.read())


if __name__ == "__main__":
    main()
