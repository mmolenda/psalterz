import json
import sys
import re

psalms = []

with open(sys.argv[1]) as fh:
    psalm = None
    for ln in fh:
        lat, pl = ln.strip().split('\t')
        if re.match('^Psalmus \d', lat):
            if psalm:
                psalms.append(psalm)
            psalm = [[lat], [pl]]
        else:
            psalm[0].append(lat)
            psalm[1].append(pl)
    psalms.append(psalm)

print json.dumps(psalms)