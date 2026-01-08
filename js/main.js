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
/* fetchが中身をとってくるまで待機、fetchはAPI_KEYが空でなければ、s-api-keyという呪文的なものと最初に指定したAPIをサーバーに送るように、空なら何もしない */

/* 中身がない場合はエラー表示 */

/* とってきたデータをjsonに変換してね */

/* エラーが出たら下のメッセージを失敗にします */

/* jsonが空だったら中止、０がからだったら中止、結果のurlがからだったら中止*/

/* もしurlが失敗したらError表示 */

/* urlの画像を表示、ブロック表示に変更、下のテキストの文字も変更 */
btn.addEventListener("click", fetchCatImage);

/* ボタンを押したらこれら全てを実行 */

/********* 構文練習 *******/


/*********** オプショナルチェーン .?のたびに中身を確認、空だったらunderfind ***********/