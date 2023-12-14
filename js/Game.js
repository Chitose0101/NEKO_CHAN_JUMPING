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

        //敵リストの更新
        this.entities.update_enemies(this.level);

        //各エンティティにフレームごとの処理をさせる
        for (let i = 0; i < this.entities.entities.length; i++) {
            this.entities.entities[i].count(this.level);
        }

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

    is_over(return_killer=false) {
        /*
        ゲームオーバーか判定
        return_killerで、trueの代わりに誰がﾈｺﾁｬﾝを倒したか返す
        */
        let killer =undefined;
        
        //すべてのﾈｺﾁｬﾝ座標について
        for (let y = this.entities.cat.y; y < this.entities.cat.y + this.entities.cat.collider_height; y++) {
            for (let x = this.entities.cat.x; x < this.entities.cat.x + this.entities.cat.collider_width; x++) {
                //ﾈｺﾁｬﾝがいるか
                if (this.entities.cat.exists(x,y)){
                    //すべての敵について
                    for (let i = 0; i < this.entities.enemies.length; i++) {
                        //敵がいるか
                        if (this.entities.enemies[i].exists(x,y)){
                            killer = this.entities.enemies[i];                  
                        }
                    }
                }
            }
        }

        if (killer == undefined) {
            return false;
        }
        if (return_killer) {
            return killer;
        }
        return true;
    }

    gameover() {
        /*
        ゲームオーバーのときの処理
        */

        const killer = this.is_over(true)

        //ゲームオーバーでなければ、何もしない
        if (killer == false) {
            return;
        }

        //もしﾈｺﾁｬﾝどうしだったら、ハートをつける
        if (killer instanceof EnemyCat){
            this.entities.add_heart();
        }

        this.gameover_timestump = Date.now();
        this.is_running = false;
    }
}
