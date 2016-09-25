#!/usr/bin/env python
# -*- coding: gbk -*-
# Last modified: 

"""docstring
"""

__revision__ = '0.1'
import sys
import re

data =set()
for line in sys.stdin:
    line = line.strip("\n")
    ll = line.split(" ",2)
    for w in re.split("，|。|、|,|\.",ll[-1]):
        w = w.strip("  ")
        if w == "":
            continue
        data.add(w)

#import chardet
#print chardet.detect(w)

for w in data:
    print '"' + w + '",';


