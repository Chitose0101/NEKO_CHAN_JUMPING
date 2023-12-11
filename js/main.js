/*
メインのコード
*/

//画面設定
const boardRow = 70;
const boardCol = 170;
const blockSize = 3;
const fps = 40;

//タップorクリック切替
var _click = (window.ontouchstart === undefined)? 'click' : 'touchstart';
document.body.addEventListener(_click, click_event);

//キャンバスの設定
const cvs = document.getElementById("cvs");
cvs.height = blockSize * boardRow;
cvs.width = blockSize * boardCol;
//コンテキスト生成
const ctx = cvs.getContext("2d");

//ゲーム生成
const game = new Game(boardRow, boardCol);
//グラフィック作成
const glaphic = new Glaphic(boardRow, boardCol, blockSize);

function click_event() {
    /*
    クリックorタップしたときのイベント
    */

    //もしゲームが開始していれば、ジャンプする
    if (game.is_running) {
        game.jump()
    //そうでなければ、
    } else {
        //ゲームオーバーから0.5秒経っていたら
        if (Date.now() - game.gameover_timestump > 500) {
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
    if (!game.is_running) {
        return
    }

    //ゲーム進行
    game.count();
    //描画
    glaphic.draw(game.entities, ctx);

    //ゲームオーバーの処理
    if (game.is_over()){
        game.gameover()
    }

    //スコア描画
    glaphic.draw_info(game.level, game.score, game.is_over(), ctx)

}

function init() {
    /*
    読み込み完了と同時に走る関数
    */

    //描画
    glaphic.draw(game.entities, ctx);
    //tap_to_startの表示
    glaphic.draw_tap_to_start(ctx)

    //インターバル開始
    setInterval(flame_event, 1000/fps);
}

window.onload = init();
