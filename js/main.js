const btn = document.querySelector("#myBtn");
const img = document.querySelector("#apiCatImg");
const statusText = document.querySelector("#apiStatus");

const API_KEY = "";
const ENDPOINT = "https://api.thecatapi.com/v1/images/search?limit=1";

async function fetchCatImage() {
  statusText.textContent = "審査中！";
  img.style.display = "none";
  img.removeAttribute("src");

  try {
    const res = await fetch(ENDPOINT, {
      headers: API_KEY ? { "x-api-key": API_KEY } : {},
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const url = data?.[0]?.url;

    if (!url) throw new Error("画像URLが取れなかった");

    img.src = url;
    img.style.display = "block";
    statusText.textContent = "本日のMVPにゃんこ！";
  } catch (e) {
    statusText.textContent = `失敗: ${e.message}`;
  }
}

btn.addEventListener("click", fetchCatImage);

/********* 構文練習 *******/


/*********** オプショナルチェーン .?のたびに中身を確認、空だったらunderfind ***********/