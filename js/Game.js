class Game {
    /*
    ゲーム進行を司るクラス
    */

    constructor(height, width) {
        /*
        コントラスタ
        height:縦サイズ
        width:横サイズ
        */
        this.height = height;
        this.width = width;
        //待機中か
        this.is_standby = true;
        //ゲームの初期化
        this.reset();
    }

    reset() {
        /*
        ゲームを初期化するときの関数
        */

        //ゲームが動いているかのフラグ
        this.is_running = false;
        //ゲームオーバーかどうかのフラグ
        this.is_over = true;
        //ゲーム開始から何フレーム経過したか
        this.timer = 0;
        //レベル、スコア
        this.level = 1;
        this.score = 0;
        //ゲームオーバーのタイムスタンプ
        this.gameover_timestump = Date.now();
        //エンティティの配置
        this.entities = new Entities(this.height, this.width);
    }

    start() {
        /*
        ゲームを開始する
        */
        this.is_standby = false;
        this.is_running = true;
        this.is_over = false;
        
    }

    click_event() {
        /*
        クリックorタップしたときのイベント
        */
        //もしゲームが動いていれば、エンティティを動かす
        if (game.is_running) {
            game.entities.click_event();

        } else {
            //ゲームオーバーから0.5秒以内なら何もしない
            if (Date.now() - game.gameover_timestump < 500) {
                return
            }
            //ゲームリセット、スタート
            game.reset();
            game.start();
        }
    }

    timing_event() {
        /*
        ゲーム進行
        */

        //もしゲームが動いていなければ何もしない
        if (game.is_running == false) {
            return
        }
        
        //タイマー更新
        this.timer ++;

        //敵リストの更新
        this.entities.update_enemies(this.level);
        //各エンティティにフレームごとの処理をさせる
        this.entities.timing_event(this.level);

        //ゲームオーバーの処理
        this.is_over = this.entities.check_gameover()
        if (this.is_over) {
            this.gameover()
        }

        //スコア更新
        this.score_up();
    }

    score_up() {
        /*
        スコア更新
        */
        this.score = parseInt(this.timer/6);
        this.level_up();
    }

    level_up() {
        /*
        レベルアップ
        */
        
        if (this.score > 1000) {
            this.level = 10
        } else {
            this.level = Math.floor(this.score/100) + 1
        }
    }

    gameover() {
        /*
        ゲームオーバーのときの処理
        */

        //もしﾈｺﾁｬﾝどうしだったら、ハートをつける
        if (this.entities.killer instanceof EnemyCat){
            this.entities.add_heart();
        }

        this.gameover_timestump = Date.now();
        this.is_over = true;  
        this.is_running = false;
    }
}