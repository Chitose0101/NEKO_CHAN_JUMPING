/*
メインのコード
*/

//画面設定
const boardRow = 70;
const boardCol = 170;
const fps = 40;

//キャンバスの取得
const cvs = document.getElementById("cvs");
//コンテキスト生成
const ctx = cvs.getContext("2d");
//仮のドットサイズ
let blockSize = 1;

//ゲーム生成
const game = new Game(boardRow, boardCol);
//グラフィック作成
const glaphic = new Glaphic(boardRow, boardCol, blockSize);

//待機画面か
let standby = true;

function click_event() {
    /*
    クリックorタップしたときのイベント
    */

    //もしゲームが開始していれば、ジャンプする
    if (game.is_running) {
        game.entities.cat.jump();

    } else {
        //ゲームオーバーから0.5秒経っていたら
        if (Date.now() - game.gameover_timestump > 500) {
            //待機画面解除
            standby = false;
            //ゲームリセット、スタート
            game.reset();
            game.start();
        }
    }
}

function count() {
    /*
    毎フレーム行われるイベント
    */

    //ゲームが開始していなければ、なにもしない
    if (game.is_running == false) {
        return;
    }

    //ゲーム進行
    game.count();

    //ゲームオーバーの処理
    game.gameover();

    //描画
    draw()
}

function draw() {
    /*
    キャンバスの描画
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

    //描画
    glaphic.draw_game(game.entities.entities, ctx);
    glaphic.draw_info(game.level, game.score, standby, game.is_over(), ctx)
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

    //描画
    draw();

    //インターバル開始
    setInterval(count, 1000/fps);
}

window.onload = init();
