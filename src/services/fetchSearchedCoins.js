export default async function fetchSearchedCoins({ queryKey, signal }) {
  const [_key, { searchQuery }] = queryKey;

  // do not initiate fetch if search query is empty
  // return empty array
  if (searchQuery == '') {
    return [];
  }

  const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
  const searchEndpoint = `https://api.coingecko.com/api/v3/search/?query=${searchQuery}&x_cg_demo_api_key=${apiKey}`;

  const res = await fetch(searchEndpoint, { signal });
  if (!res.ok) throw new Error('failed to fetch all coins from coingecko api');
  const jsonData = await res.json();
  return jsonData.coins;
}
