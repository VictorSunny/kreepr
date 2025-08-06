
export default async function fetchAllCoins({queryKey, pageParam}) {

    const [_key, {currency, sort}] = queryKey

    const apiKey = import.meta.env.VITE_COINGECKO_API_KEY
    
    const allCoinsUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${pageParam}&per_page=40&precision=2&order=${sort}&price_change_percentage=1h,24h,7d,30d,60d?x_cg_demo_api_key=${apiKey}/`
    
    const res = await fetch(allCoinsUrl);
    if (!res.ok) throw new Error('failed to fetch all coins from coingecko api');
    const jsonData = await res.json()
    return jsonData
}