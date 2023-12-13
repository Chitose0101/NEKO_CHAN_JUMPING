class Runner extends Entity{
    /*
    走るものの親クラス
    */

    constructor(display_height, display_width, xy) {
        /*
        コントラスタ
        */
        super(display_height, display_width, xy);

        //走っているか
        this.is_running = false;
        //走る速さ
        this.speed = 0;
    }
    
    run() {
        /*
        元の位置に戻って走り出す
        */
        this.is_running = true;
    }

    count(level) {
        /*
        フレームごとの処理
        親クラスのオーバーライド
        */
        super.count();

        //走っていなければ何もしない
        if (this.is_running == false) {
            return
        }

        //速さ更新
        this.speed = level + 1;

        //x座標の更新
        this.x -= this.speed;
    }  
}
