from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
import argparse,os
p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8766);a=p.parse_args()
os.chdir(Path(__file__).resolve().parents[1]/'public')
print(f'Open http://127.0.0.1:{a.port}/ ; Ctrl+C to stop',flush=True)
ThreadingHTTPServer(('127.0.0.1',a.port),SimpleHTTPRequestHandler).serve_forever()
