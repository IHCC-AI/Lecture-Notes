# Hardware

While this is an AI class, AI is software and software needs hardware to run.

## AI Content Farm

Let students present their AI content farm group projects.
Rest of lecture won't be long, so let students present as long as they like.

## Basics of Computing

Yes we have to go over this.
Look at:

<!-- Add tap drives as storage -->

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

[Why PI?](https://www.youtube.com/results?search_query=jeff+geerling+raspberry+pi).
It's a cheap computer that we can tinker around with.
Let's reinstall an OS onto IT

1. Download Raspberry PI Imager
2. Run as administrator `sudo ./raspberrypi-imager.appimage`
3. Select the PI 4
4. Choice PI OS LIE (64-BIT)
5. Configure WIFI
6. Choose SD card to flash.
7. Once PI is done plug sd card into PI and Plug in PI to power.

```
hostname: ai-pi
username: lukepi
password: raspberry@12
```

## Why Linux?

- The web runs on Linux
- Your code you write goes to a linux server
- I will convert you all one day
- What is a package manager?

## SSH into PI

- Find the IP of the PI
    -
- Connect computer monitor to find IP.
    - It will be on the boot screen
    - If you turn the PI, the IP will change.
- Run the following to connect to the PI

```bash
ssh lukepi@ai-pi.local
```

- Login with password.

## Play around with the PI

Really show the class we are not on my laptop we are context to the PI.

<!-- TODO Make a diagram. -->

### Show the spects of PI vs PC

On PI use apt package manager.

```
sudo apt update
apt install fastfetch
fastfetch
```

On local system run `fastfetch` or open task manager

## Install software on the PI

Silly matrix inspired terminal program.

```bash
sudo apt install cmatrix
cmatrix
```

View Websites in Terminal
Install [brow.sh](https://brow.sh/)

```bash
sudo apt install w3m
w3m wikipedia.org
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

Have students download ISO files for tomorrow or copy from USB drive.
Warn them if they don't download times will be very long tomorrow.

- [Debian](https://www.debian.org/distrib/netinst)
