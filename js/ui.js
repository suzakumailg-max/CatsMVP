export const BASE_URL = "https://api.thecatapi.com/v1/images";

export async function fetchCatById(id, apiKey) {
  if (!apiKey) throw new Error("API_KEYが未設定");

  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { "x-api-key": apiKey },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json(); // { id, url, ... }
}
