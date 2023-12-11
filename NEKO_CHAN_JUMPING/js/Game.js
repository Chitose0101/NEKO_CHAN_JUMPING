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

        this.reset()
    }

    reset() {
        /*
        ゲームを初期化するときの関数
        */

        //すべてのエンティティ
        this.entities = [];

        //ﾈｺﾁｬﾝ配置
        this.cat = new Cat(this.height, this.width, 16);
        this.entities.push(this.cat)

        //敵配置
        this.enemies = [];
        //花
        for (let i = 0; i < 3; i++) {
            let flower= new Flower(this.height, this.width);
            this.enemies.push(flower);
            this.entities.push(flower);
        }
        //鳥
        let bird = new Bird(this.height, this.width);
        this.enemies.push(bird);
        this.entities.push(bird);

        //ゲームが開始しているかのフラグ
        this.is_running = false;

        //ゲーム開始から何フレーム経過したか
        this.timer = 0;

        //レベル、スコア
        this.level = 0;
        this.score = 0;
    }

    start() {
        /*
        ゲームを開始する
        */
        this.is_running = true;
    }

    jump(){
        /*
        ﾈｺﾁｬﾝがジャンプする
        */
        this.cat.jump()
    }

    run_enemies(){
        /*
        確率で敵を走らせる
        */

        //もし近くに走る敵があれば走らない
        for (let i = 0; i < this.enemies.length; i++) {
            let interval = this.cat.width * 2 + this.enemies[i].width * this.level;
            if (this.enemies[i].is_running) {
                if (this.width - this.enemies[i].x < interval  + this.enemies[i].width) {
                    return
                }
            }   
        }

        //確率で走り出す
        let probabillity = 20 * this.enemies.length;
        for (let i = 0; i < this.enemies.length; i++) {
                let random = Math.random();
                if (random * probabillity < 1) {
                    this.enemies[i].run();
                    return
                }
            }
    }

    level_up() {
        /*
        レベルアップ
        */

        //レベル10まで
        if (this.level >= 10) {
            return
        }

        //200ごとにレベルアップ
        if (this.timer % 600 > 0) {
            return
        }

        //レベル増加
        this.level ++;
        //敵の速さ変更
        for (let i = 0; i < this.enemies.length; i++){
            this.enemies[i].set_speed(1 + this.level);
        }
    }

    count() {
        /*
        ゲーム進行
        */

        //新しく敵を走らせる
        this.run_enemies()

        //すべてのエンティティに対してコライダー更新
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update_collider();
        }

        //スコア更新
        this.score = parseInt(this.timer/6)

        //レベルアップ
        this.level_up();

        //タイマー更新
        this.timer ++;
    }

    is_over() {
        /*
        ゲームオーバーか判定
        */

        //すべてのﾈｺﾁｬﾝ座標について
        for (let y = this.cat.y; y < this.cat.y + this.cat.height; y++) {
            for (let x = this.cat.x; x < this.cat.x + this.cat.width; x++) {
                //ﾈｺﾁｬﾝがいるか
                if (this.cat.exists(x,y)){
                    //すべての敵について
                    for (let i = 0; i < this.enemies.length; i++) {
                        //敵がいるか
                        if (this.enemies[i].exists(x,y)){
                            return true;                  
                        }
                    }
                }
            }
        }
        return false
    }

    gameover() {
        /*
        ゲームオーバーのときの処理
        */
        this.gameover_timestump = Date.now();
        this.is_running = false;
    }
}