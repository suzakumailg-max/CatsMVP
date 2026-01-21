// js/api.js
const API_KEY = "";
const BASE_URL = "https://api.thecatapi.com/v1/images";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: API_KEY ? { "x-api-key": API_KEY } : {},
  });//urlが取れるまで待機
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();//urlが取れたらfetchBreedCatUrlの続きを実行
}

export async function fetchRandomCatUrl() {
  const endpoint = `${BASE_URL}/search?limit=1`;
  const data = await fetchJson(endpoint);
  const url = data?.[0]?.url;
  if (!url) throw new Error("画像URLが取れなかった");
  return url;
}

export async function fetchBreedCatUrl(breedId) {//urlを取る関数
  const endpoint = `${BASE_URL}/search?limit=1&breed_ids=${encodeURIComponent(breedId)}`;//urlが正しく取れるように保険をかける
  const data = await fetchJson(endpoint);//jsonをとる関数が終了するまで待機
  const url = data?.[0]?.url;
  if (!url) throw new Error("画像URLが取れなかった");
  return url;//待ってくれているfetchBreedCatUrlの関数の続きを実行
}
