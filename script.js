// =========================
// ① 初期データ（最初からある漢字カード）
// =========================
let cards = [
  // 漢字「日」と意味
  { kanji: "日", meaning: "ひ ・ にち" },

  // 漢字「学」と意味
  { kanji: "学", meaning: "まなぶ" },

  // 漢字「生」と意味
  { kanji: "生", meaning: "いきる ・ なま" },
];

// =========================
// ② localStorage に保存されたデータを取得する
// =========================

// localStorage から "kanjiCards" という名前のデータを取得
let data = localStorage.getItem("kanjiCards");

// もし保存されたデータが存在する場合
if (data !== null) {
  // JSON形式の文字列をオブジェクト（配列）に変換
  cards = JSON.parse(data);
}

// =========================
// ③ 現在表示しているカードの番号
// =========================

// 最初は 0 番目のカード
let index = 0;

// =========================
// ④ カードを画面に表示する関数
// =========================
function showCard() {
  // 表側に漢字を表示
  document.getElementById("front").innerText = cards[index].kanji;

  // 裏側に意味を表示
  document.getElementById("back").innerText = cards[index].meaning;
}

// ページを開いたときに最初のカードを表示
showCard();

// =========================
// ⑤ カードをクリックして裏返す処理
// =========================

// カード全体がクリックされたとき
document.getElementById("card").onclick = function () {
  // "flip" クラスを付けたり外したりする
  // → CSSでカードが裏返る
  document.getElementById("inner").classList.toggle("flip");
};

// =========================
// ⑥ 次のカードへ進む関数
// =========================
function nextCard() {
  // カード番号を1つ進める
  index = index + 1;

  // もし最後のカードまで行ったら
  if (index >= cards.length) {
    // 最初のカードに戻す
    index = 0;
  }

  // 裏返し状態を元に戻す
  document.getElementById("inner").classList.remove("flip");

  // 新しいカードを表示
  showCard();
}

// =========================
// ⑦ 新しい漢字カードを追加する関数
// =========================
function addCard() {
  // 入力された漢字を取得
  let kanji = document.getElementById("kanjiInput").value;

  // 入力された意味を取得
  let meaning = document.getElementById("meaningInput").value;

  // どちらかが空の場合はエラー表示
  if (kanji === "" || meaning === "") {
    alert("漢字と意味を入力してください！");
    return; // 処理を止める
  }

  // 新しいカードのオブジェクトを作成
  let newCard = {
    kanji: kanji,
    meaning: meaning,
  };

  // カード配列に追加
  cards.push(newCard);

  // localStorage に保存（文字列に変換して保存）
  localStorage.setItem("kanjiCards", JSON.stringify(cards));

  // 保存完了メッセージ
  alert("保存しました！");

  // 入力欄を空にする
  document.getElementById("kanjiInput").value = "";
  document.getElementById("meaningInput").value = "";
}

// =========================
// ⑧ 追加した漢字カードを全て削除する関数
// =========================
function resetCards() {
  // 削除していいか確認ダイアログを表示
  let result = confirm("追加された漢字フラッシュカードを全てクリアしますか。");

  // OK が押された場合
  if (result === true) {
    // localStorage からデータを削除
    localStorage.removeItem("kanjiCards");

    // ページを再読み込みして初期状態に戻す
    location.reload();
  }
}
