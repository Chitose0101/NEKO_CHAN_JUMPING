class Entity {
    /*
    すべてのエンティティの親クラス
    */

    constructor (display_height, display_width, xy, args) {
        /*
        コントラスタ
        */

        //画面の大きさ
        this.display_height = display_height;
        this.display_width = display_width;

        //アニメーションの更新速度
        this.animation_speed = 0;
        //アニメーションの設定（3d配列、直方体）
        //0無色1黒2白として、二次元配列をフレームの数だけ重ねる
        this.animation = [[[]]];

        //子クラスの設定
        this.setting(args);

        //コライダーの自動生成（指定がなかった場合）
        //0判定なし、1より大きければ判定ありとして、二次元配列をフレームの数だけ重ねる
        //コライダーの配列の大きさはアニメーションと同じ
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

        //xyの初期位置（指定がなかった場合）
        if (this.init_x == undefined) {
            this.init_x = this.display_width;
        }
        if (this.init_y == undefined) {
            this.init_y = this.display_height - this.height - 1;
        }

        //生成から何フレーム経過したか
        this.timer = 0;
        //アニメーションの現在のフレーム
        this.current_frame = 0;

        //生成位置
        if (xy === undefined) {//もし指定がなければ画面外、右
            this.reset_xy();
        } else {
            this.x = xy[0];
            this.y = xy[1];
        }
    }

    setting(args) {
        /*
        子クラスの設定
        */
    }

    init_animation(args) {
        /*
        アニメーションの設定
        0無色1黒2白として、二次元配列をフレームの数だけ重ねる
        オーバーライド推奨
        */
    }

    reset_xy() {
        /*
        xyを初期位置に戻す
        */
        this.x = this.init_x;
        this.y = this.init_y;
    }

    count() {
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
                //指定した座標の値を返す
                return this.collider[this.current_frame][y - this.y][x - this.x]
            }
        }
    }
}
