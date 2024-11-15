import sys
sys.path.append('/Users/francinemagno/anaconda3/lib/python3.11/site-packages')
from pyOpenBCI import OpenBCIGanglion

print("hi")

import numpy as np
import serial
import xmltodict
import requests
from pyOpenBCI import OpenBCIGanglion

board = OpenBCIGanglion(mac='f5:f7:0f:42:32:06')