export default async function fetchTrendingCoins() {
  const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;

  const trendingCoinsEndpoint = `https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=${apiKey}`;

  const res = await fetch(trendingCoinsEndpoint);
  if (!res.ok) throw new Error('failed to fetch all coins from coingecko api');
  const jsonData = await res.json();
  return jsonData.coins;
}
