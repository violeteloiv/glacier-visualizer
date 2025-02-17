from PIL import Image

import pytesseract
import mss
import numpy

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\\tesseract'

mon = { 'top': 943, 'left': 1782, 'width': 1885 - 1782, 'height': 956 - 943 }

with mss.mss() as sct:
    # while True:
    im = numpy.asarray(sct.grab(mon))

    text = pytesseract.image_to_string(im)
    print(text[0:-2])