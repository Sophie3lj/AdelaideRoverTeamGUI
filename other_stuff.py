import time
import fleet_demonstration
import interface
import requests

"""
Code by Monash Nova Rover
"""

def get_authentication():
    post = requests.post("https://fleet-space.auth.ap-southeast-2.amazoncognito.com/oauth2/token", headers={
        "Authorization": "",
        "Content-Type": "application/x-www-form-urlencoded"
    }, data={"grant_type": "client_credentials", "scope":"FleetAPI/read"})
    try:
        authentication = post.json()["access_token"]
    except:
        print("Failed to fetch authentication data")
        exit()
    return authentication


def get_data(auth_key):
    data = requests.get("https://api.v2.fleet-infra.net/data", headers=
        {'Authorization': auth_key,
        'Accept': 'application/json'}
    )
    try:
        json_data = data.json()
        # Write to data
        with open("modem_json_data.json", "w") as file:
            file.writelines(str(json_data))
        print("Written data to .json file.")
    except:
        print("Failed to fetch data.")
    return json_data


def parse_status(status):
    if not status:
        print("No message received")
        return 6
    return int(str(status[0]).split('"')[2].split(",")[3][0])


def main():
    i.transmit_message("NovaRover: Ready to begin operation", identifier="test-operation-1")

    # 2. wait for satellite to confirm receipt of message
    i.read()
    
    # 2.1 check that the modem has sent the data
    while True:
        i.get_transmission_status()
        time.sleep(0.2)
        status = i.read()
        code = parse_status(status)
        if code == 4:
            print("queuing message... ")
        elif code == 5:
            print("sending msg... ")
        elif code == 6:
            print("msg received... ")
            break

    # 3. do demo stuff
    fleet_demonstration.main()

