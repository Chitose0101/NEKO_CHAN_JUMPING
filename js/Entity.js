class Entity {
    /*
    すべてのエンティティの親クラス
    */

    constructor (x=0, y=0) {
        /*
        コントラスタ
        x,y生成位置
        */
        this.x = x
        this.y = y

        //アニメーションの更新速度
        this.animation_speed = 0;

        //生成から何フレーム経過したか
        this.timer = 0;
        //アニメーションの現在のフレーム
        this.current_frame = 0;

        this.set_collider()
    }

    set_collider(){
        /*
        アニメーション、コライダーなどの設定、補足
        */

        //アニメーションの設定（3d配列、直方体）
        //0無色1黒2白として、二次元配列をフレームの数だけ重ねる
        if (this.animation == undefined) {
            this.animation = [[[]]];
        }

        if (this.collider == undefined) {
            this.collider = this.animation;
        }

        //アニメーション、コライダーの最大枠の自動生成
        this.animation_height = this.animation[0].length;
        this.animation_width = this.animation[0][0].length;
        this.collider_height = this.collider[0].length;
        this.collider_width = this.collider[0][0].length;
        this.height = Math.max(this.animation_height, this.collider_height);
        this.width = Math.max(this.animation_width, this.collider_width);
    }

    set_xy(x, y) {
        /*
        xyの位置設定
        */
        this.x = x
        this.y = y
    }

    click_event() {
        /*
        クリック時のイベント
        */
        ;
    }

    timing_event() {
        /*
        フレームごとの処理
        */

        //タイマー更新
        this.timer++

        //アニメーションの更新
        if (this.animation_speed > 0) {//アニメーション速度が0なら何もしない
            for (let i = 0; i < this.animation.length; i++) {
                if (this.timer % (this.animation_speed * this.animation.length) == this.animation_speed * i) {
                    this.current_frame = i;
                }
            }
        }
    }

    color(x,y) {
        /*
        画面上のxy座標の色を返す
        x:画面上でのx座標
        y:画面上でのy座標
        0:無色
        1:黒
        2:白
        */

        //存在する座標か
        if (0 <= y - this.y && y - this.y < this.animation_height) {
            if (0 <= x - this.x && x - this.x < this.animation_width) {
                //指定した座標の値を返す
                return this.animation[this.current_frame][y - this.y][x - this.x]
            }
        }
    }

    exists(x,y) {
        /*
        画面上のxy座標にコライダーが存在するか
        x:画面上でのx座標
        y:画面上でのy座標
        */

        //存在する座標か
        if (0 <= y - this.y && y - this.y < this.collider_height) {
            if (0 <= x - this.x && x - this.x < this.collider_width) {
                if (this.collider[this.current_frame][y - this.y][x - this.x] > 0) {
                    return true
                }
            }
        }
        return false
    }
}
