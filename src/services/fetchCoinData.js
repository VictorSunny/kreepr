
export async function fetchCoinData({queryKey}) {

    const [_key, {coinID}] = queryKey

    
    const apiKey = import.meta.env.VITE_COINGECKO_API_KEY
    const coinDataEndpoint = `https://api.coingecko.com/api/v3/coins/${coinID}?x_cg_demo_api_key=${apiKey}`
    
    const res = await fetch(coinDataEndpoint);
    if (!res.ok) throw new Error('failed to fetch all coins from coingecko api');
    const jsonData = await res.json()
    return jsonData
}

export async function fetchCoinChartData({queryKey}) {

    const [_key, {coinID, timeFrame, currency}] = queryKey
    

    const apiKey = import.meta.env.VITE_COINGECKO_API_KEY
    const coinChartEndpoint = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency}&days=${timeFrame}&precision=2?x_cg_demo_api_key=${apiKey}`

    const res = await fetch(coinChartEndpoint);
    if (!res.ok) throw new Error('failed to fetch all coins from coingecko api');
    const jsonData = await res.json()
    return jsonData
}