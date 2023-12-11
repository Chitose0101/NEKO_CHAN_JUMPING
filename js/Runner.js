class Runner extends Entity{
    /*
    敵の親クラス
    */

    constructor(display_height, display_width, x, y) {
        /*
        コントラスタ
        */
        
        //親コントラスタの呼び出し
        super(display_height, display_width, x, y);
        //走っているか
        this.is_running = false;
        //走る速さ
        this.speed = 0;
    }

    set_speed(v){
        /*
        速さの変更
        v:変更後の速さ
        */
        this.speed = v;
    }
    
    run(){
        /*
        走り出す
        */
        if (this.is_running == false) {
            this.is_running = true;
        }
    }

    stop() {
        /*
        元の位置に戻って止まる
        */
        this.x = this.display_width;
        this.is_running = false;
    }

    update_collider() {
        /*
        コライダーの更新
        */

        if (this.is_running == false) {
            return
        }

        //x座標の更新
        this.x -= this.speed;

        if (this.x + this.width < 0) {
            //元の位置に戻って止まる
            this.stop()
        }
    }
    
}