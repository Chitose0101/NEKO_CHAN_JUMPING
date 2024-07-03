/*
メインのコード
*/

//描画更新の速さ
const fps = 40;
//ドットの数
const boardRow = 70;
const boardCol = 170;
//仮のドットサイズ(ゲーム画面のドットの数に合わせて、ドットサイズを変える)
let blockSize = 1;

//キャンバスの取得
const cvs = document.getElementById("cvs");
//ゲームの生成
const game = new Game(boardRow, boardCol)
//ゲーム画面の作成
const glaphic = new Glaphic(game, cvs, blockSize);


function click_event() {
    /*
    クリックorタップしたときのイベント
    */
   game.click_event()
}


function timing_event() {
    /*
    毎フレーム行われるイベント
    */
    //ゲーム更新
    game.timing_event()
    //描画
    draw()
}


function draw() {
    /*
    キャンバスの更新
    */

    //ドットサイズ、キャンバスサイズの設定
    if (window.innerHeight > window.innerWidth) {
        blockSize = Math.floor(window.innerWidth / boardCol * 0.8);
    } else {
        blockSize = Math.floor(window.innerHeight / boardRow / 2);
    }
    if (blockSize < 1) {
        blockSize = 1
    }
    cvs.height = blockSize * boardRow;
    cvs.width = blockSize * boardCol;

    //グラフィックのブロックサイズ更新
    glaphic.set_blockSize(blockSize);

    //ゲーム画面の描画
    glaphic.draw_game()
}


function init() {
    /*
    読み込み完了と同時に走る関数
    */

    //リサイズイベントのバインド
    window.addEventListener("resize", draw);
    //タップorクリックイベントのバインド
    const _click = (window.ontouchstart === undefined)? "mousedown" : "touchstart";
    window.addEventListener(_click, click_event);

    //インターバル開始
    setInterval(timing_event, 1000/fps);
}


window.onload = init();