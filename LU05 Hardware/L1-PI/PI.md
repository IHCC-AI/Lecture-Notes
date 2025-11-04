# Hardware

While this is an AI class, AI is software and software needs hardware to run.

## Basics of Computing

Yes we have to go over this.
Look at:

![Digram](renderModes.excalidraw.png)

## Hardware used to Run AI

Computers, but.... fancy.
Look up images of servers.
AI likes memory/vram.
AI likes GPU.

- Look at GPU and VRAM costs.
- Build a pc with them all from dell.com

## What you All have

- Pick a normal laptop and compare it to a server.
    - RAM
    - CPU count
    - PCEI
    - ECC RAM
    - Storage Max capacity.

## PI

[Why PI?]()
It's a cheap computer that we can tinker around with.
Let's reinstall an OS onto IT

1. Download Raspberry PI Imager
2. Select the PI 4
3. Choice PI OS LIE (64-BIT)
4. Configure WIFI
5. Choose SD card to flash.
6. Once PI is done plug sd card into PI and Plug in PI to power.

```
username: pi
password: raspberry 
```

## Why Linux?

- The web runs on Linux
- Your code you write goes to a linux server
- I will convert you all one day
- What is a package manager?

## SSH into PI

- Connect computer monitor to find IP.
    - It will be on the boot screen
    - If you turn the PI, the IP will change.
- Run the following to connect to the PI

```bash
ssh pi@10.12.182.32
```

- Login with password.

## Play around with the PI

Really show the class we are not on my laptop we are context to the PI.
Make a digram.

### Show the spects of PI vs PC

[//]: # (Once PIOS is based on debain 13 move to `fastfetch`)

On PI use apt package manager.

```
sudo apt update
apt install neofetch
neofetch
```

On local system run `fastfetch` or open task manager

## Install software on the PI

```bash
sudo apt install cmatrix
cmatrix
```

### WebServer

```bash
mkdir my_web_server
cd my_web_server
nano server.py
```

```python
import http.server
import socketserver

PORT = 8000

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(b"<h1>hello ai class</h1>")

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
```

Run the code

```bash
python3 server.py
```

Fix any errors in typing

On laptop web browser enter the PI ip (same one you used for SSH then the port in the code (8080))
There we go we just built a VERY simple web server.

## Homework

Have students download ISO files for tomorrow.
Warn them if they don't download times will be very long tomorrow. 

- Windows 11
    - Windows 11 Luke Edition
- Debian



