# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import sys
import subprocess

bashCommand = sys.argv[1:]
subprocess.run(bashCommand)

hostName = "0.0.0.0"
webhook_route = "/webhook"
serverPort = 8080


class MyServer(BaseHTTPRequestHandler):

    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        if self.path == webhook_route:
            self._set_headers()
            self.wfile.write(bytes("</body></html>", "utf-8"))

    def do_POST(self):
        if self.path == webhook_route:
            self._set_headers()
            content_len = int(self.headers.get('content-length', 0))
            post_body = self.rfile.read(content_len)
            parsed_body = json.loads(post_body)
            self.wfile.write(post_body)
            print("received post {}".format(parsed_body))
            print("running target script: {}".format(bashCommand))
            subprocess.run(bashCommand)


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Sync server started http://%s:%s" % (hostName, serverPort))
    print("serving sync webhook at :{}".format(webhook_route))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Sync server stopped.")
