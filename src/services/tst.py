import requests

url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7&precision=2'

print(requests.get(url).text)