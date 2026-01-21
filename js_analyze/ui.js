// js/ui.js
import { fetchRandomCatUrl, fetchBreedCatUrl } from "./api.js";

function setLoading({ imgEl, statusEl, message = "審査中！" }) {//取得した後2番目の関数
  statusEl.textContent = message;//審査中のまま
  imgEl.style.display = "none";//イメージを見せない
  imgEl.removeAttribute("src");//イメージのソース部分を削除
  //関数の指定はないため、一番上からの処理に移行、なので、次に実行するのは関数ではないconst url
}

function setSuccess({ imgEl, statusEl, url, message }) {//URlが代入されたら実行される関数
  imgEl.src = url;//イメージ部分をurlをsrcに入れて表示
  imgEl.style.display = "block";//隠してた部分を再表示
  statusEl.textContent = message;//本日のMVPが入る
}

function setError({ statusEl, err }) {
  statusEl.textContent = `失敗: ${err.message}`;
}

async function handleBreedRadioChange(radioEl) {//取得して1番目の関数
  const breedId = radioEl.dataset.breedId;//APIの際のID
  const imgSel = radioEl.dataset.img;//#〇〇CatApi
  const statusSel = radioEl.dataset.status;//#〇〇ApiStatus

  const imgEl = document.querySelector(imgSel);//表示されるはずのイメージのところを取得（データ持ち）
  const statusEl = document.querySelector(statusSel);//表示イメージの下のテキスト部分のDOM取得（データなし）

  setLoading({ imgEl, statusEl });//イメージとテキストのプロパティを作ってオブジェクト化して次の関数を実行

  try {
    const url = await fetchBreedCatUrl(breedId);//取得したAPIのIDを引数にしてAPI.jsの関数を実行、その関数がurlを代入されたら次へ進む
    setSuccess({ imgEl, statusEl, url, message: "本日のMVP！" });//APIのurlと今までに取ったデータと、messageを変更する引数をもってsetSuccessの関数を実行
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

export function initUI() {//一番最初に実行されるイベント待ちの関数
  // ラジオ（3種）
  const selectCats = document.querySelector("#selectCats");
  selectCats.addEventListener("change", (e) => {
    const el = e.target;//ここでボタン検知
    if (!el.matches('input[type="radio"][name="attend"]')) return;
    if (!el.checked) return;
    handleBreedRadioChange(el);//データをelに収納して、次の関数を呼び出し
  });

  // MVPボタン（総合）
  const btn = document.querySelector("#myBtn");
  btn.addEventListener("click", handleMvpButtonClick);
}
