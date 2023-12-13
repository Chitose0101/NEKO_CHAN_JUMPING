class Game {
    /*
    ゲーム画面を司るクラス
    */

    constructor(height, width) {
        /*
        コントラスタ
        height:画面の縦サイズ
        width:画面の横サイズ
        */
        this.height = height;
        this.width = width;

        //ゲームオーバーのタイムスタンプ
        this.gameover_timestump = Date.now();

        this.reset();
    }

    reset() {
        /*
        ゲームを初期化するときの関数
        */

        //ゲームが開始しているかのフラグ
        this.is_running = false;

        //ゲーム開始から何フレーム経過したか
        this.timer = 0;

        //レベル、スコア
        this.level = 0;
        this.score = 0;

        //エンティティ配置
        this.entities = new EntityManager(this.height, this.width)
    }

    start() {
        /*
        ゲームを開始する
        */
        this.is_running = true;
    }

    count() {
        /*
        ゲーム進行
        */

        //スコア更新
        this.score_up();

        //エンティティにフレームごとの処理をさせる
        this.entities.count(this.level)

        //タイマー更新
        this.timer ++;
    }

    score_up() {
        /*
        スコア更新
        */

        //0.15秒で1増加
        this.score = parseInt(this.timer/6);

        //レベルアップ
        this.level_up();
    }

    level_up() {
        /*
        レベルアップ
        */

        //レベル10まで
        if (this.level >= 10) {
            return;
        }

        //100ごとにレベルアップ
        if (this.timer % 600 > 0) {
            return;
        }

        //レベル増加
        this.level ++;
    }

    is_over() {
        /*
        ゲームオーバーか判定
        */
        return this.entities.is_cat_killed();
    }

    gameover() {
        /*
        ゲームオーバーのときの処理
        */
        this.gameover_timestump = Date.now();
        this.is_running = false;
    }
}
