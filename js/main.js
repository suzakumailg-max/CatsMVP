import { fetchCatById } from "./api.js";
import { setStatus, showImage } from "./ui.js";

const API_KEY = "";

const btn = document.querySelector("#myBtn");
const img = document.querySelector("#apiCatImg");
const statusText = document.querySelector("#apiStatus");

btn.addEventListener("click", async () => {
  try {
    setStatus(statusText, "審査中！");
    img.style.display = "none";

    const data = await fetchCatById("黒猫の固定ID", API_KEY);
    showImage(img, data.url);
    setStatus(statusText, "本日のMVPにゃんこ！");
  } catch (e) {
    setStatus(statusText, `失敗: ${e.message}`);
  }
});
