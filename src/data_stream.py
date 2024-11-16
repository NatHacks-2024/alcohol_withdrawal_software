from pyOpenBCI import OpenBCIGanglion

def print_raw(sample):
    print(sample.channels_data)
    
board = OpenBCIGanglion(mac='f5:f7:0f:42:32:06')
board.start_stream(print_raw)