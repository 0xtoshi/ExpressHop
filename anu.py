import requests
origin = '0x99c5591664b10d5655ef32102b1Fe974d4c76923'
addr = origin
alladdr = set()
while(True):
    print(addr)
    if addr in alladdr:
        break
    alladdr.add(addr)
    api = 'https://api.arbiscan.io/api?module=account&action=txlist&address=%s&startblock=0&endblock=99999999&page=1&sort=desc&apikey=YourApiKeyToken' % addr
    r = requests.get(api)
    addr = r.json()['result'][0]['to']