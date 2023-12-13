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
let ctx = cvs.getContext("2d");

//仮のドットサイズ
let blockSize = 1;

//ゲーム生成
const game = new Game(boardRow, boardCol);
//グラフィック作成
const glaphic = new Glaphic(boardRow, boardCol, blockSize);

//待機画面か
is_standby = true;

function resize_block() {
    /*
    画面に合わせてドット、キャンバスの大きさを設定する
    */

    //画面が縦長なら横90%
    if (window.innerHeight > window.innerWidth) {
        blockSize = Math.floor(window.innerWidth / boardCol * 0.8);
    //横長なら縦1/2
    } else {
        blockSize = Math.floor(window.innerHeight / boardRow / 2);
    }
    cvs.height = blockSize * boardRow;
    cvs.width = blockSize * boardCol;

    //グラフィックのブロックサイズ更新
    glaphic.set_blockSize(blockSize);

    //再描画
    glaphic.draw(game.entities.entities, ctx);
    if (is_standby == true) {
        glaphic.draw_tap_to_start(ctx);
    } else {
        glaphic.draw_info(game.level, game.score, game.is_over(), ctx);
    }
}

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
            is_standby = false;
            //ゲームリセット、スタート
            game.reset();
            game.start();
        }
    }
}

function flame_event() {
    /*
    毎フレーム行われるイベント
    */

    //ゲームが開始していなければ、なにもしない
    if (game.is_running == false) {
        return;
    }

    //ゲーム進行
    game.count();
    //描画
    glaphic.draw(game.entities.entities, ctx);

    //ゲームオーバーの処理
    if (game.is_over()){
        game.gameover();
    }

    //スコア描画
    glaphic.draw_info(game.level, game.score, game.is_over(), ctx);
}

function init() {
    /*
    読み込み完了と同時に走る関数
    */

    //キャンバスのリサイズ
    resize_block();

    //リサイズイベントのバインド
    window.addEventListener("resize", resize_block);
    //タップorクリックイベントのバインド
    const _click = (window.ontouchstart === undefined)? "mousedown" : "touchstart";
    window.addEventListener(_click, click_event);

    //インターバル開始
    setInterval(flame_event, 1000/fps);
}

window.onload = init();
