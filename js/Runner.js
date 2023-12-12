class Runner extends Entity{
    /*
    走るものの親クラス
    */

    constructor(display_height, display_width, x, y) {
        /*
        コントラスタ
        */
        super(display_height, display_width, x, y);

        //走っているか
        this.is_running = false;
        //走る速さ
        this.speed = 0;
    }

    set_speed(v){
        /*
        走る速さのセッター
        */
        this.speed = v;
    }
    
    run(){
        /*
        元の位置に戻って走り出す
        */

        //もし既に走っていたら何もしない
        if (this.is_running) {
            return;
        }

        this.x = this.display_width;
        this.is_running = true;
    }

    stop() {
        /*
        止まる
        */
        this.is_running = false;
    }

    count() {
        /*
        フレームごとの処理
        親クラスのオーバーライド
        */
        super.count();

        //走っていなければ何もしない
        if (this.is_running == false) {
            return
        }

        //x座標の更新
        this.x -= this.speed;

        //画面外まで出たら止まる
        if (this.x + this.width < 0) {
            this.stop();
        }
    }
    
}
