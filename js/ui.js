// js/ui.js
import { fetchRandomCatUrl, fetchBreedCatUrl } from "./api.js";

function setLoading({ imgEl, statusEl, message = "審査中！" }) {
  statusEl.textContent = message;
  imgEl.style.display = "none";
  imgEl.removeAttribute("src");
}

function setSuccess({ imgEl, statusEl, url, message }) {
  imgEl.src = url;
  imgEl.style.display = "block";
  statusEl.textContent = message;
}

function setError({ statusEl, err }) {
  statusEl.textContent = `失敗: ${err.message}`;
}

async function handleBreedRadioChange(radioEl) {
  const breedId = radioEl.dataset.breedId;
  const imgSel = radioEl.dataset.img;
  const statusSel = radioEl.dataset.status;

  const imgEl = document.querySelector(imgSel);
  const statusEl = document.querySelector(statusSel);

  setLoading({ imgEl, statusEl });

  try {
    const url = await fetchBreedCatUrl(breedId);
    setSuccess({ imgEl, statusEl, url, message: "本日のMVP！" });
  } catch (err) {
    setError({ statusEl, err });
  }
}

async function handleMvpButtonClick() {
  const imgEl = document.querySelector("#apiCatImg");
  const statusEl = document.querySelector("#apiStatus");

  setLoading({ imgEl, statusEl });

  try {
    const url = await fetchRandomCatUrl();
    setSuccess({ imgEl, statusEl, url, message: "本日のMVPにゃんこ！" });
  } catch (err) {
    setError({ statusEl, err });
  }
}

export function initUI() {
  // ラジオ（3種）
  const selectCats = document.querySelector("#selectCats");
  selectCats.addEventListener("change", (e) => {
    const el = e.target;
    if (!el.matches('input[type="radio"][name="attend"]')) return;
    if (!el.checked) return;
    handleBreedRadioChange(el);
  });

  // MVPボタン（総合）
  const btn = document.querySelector("#myBtn");
  btn.addEventListener("click", handleMvpButtonClick);
}
