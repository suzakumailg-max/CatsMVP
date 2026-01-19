// js/api.js
const API_KEY = "";
const BASE_URL = "https://api.thecatapi.com/v1/images";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: API_KEY ? { "x-api-key": API_KEY } : {},
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchRandomCatUrl() {
  const endpoint = `${BASE_URL}/search?limit=1`;
  const data = await fetchJson(endpoint);
  const url = data?.[0]?.url;
  if (!url) throw new Error("画像URLが取れなかった");
  return url;
}

export async function fetchBreedCatUrl(breedId) {
  const endpoint = `${BASE_URL}/search?limit=1&breed_ids=${encodeURIComponent(breedId)}`;
  const data = await fetchJson(endpoint);
  const url = data?.[0]?.url;
  if (!url) throw new Error("画像URLが取れなかった");
  return url;
}
