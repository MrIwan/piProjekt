import subprocess
import time

p = subprocess.Popen(['python3', '/home/iwan/workSpace/piProjekt/server/main.py'])


time.sleep(20)
p.terminate()