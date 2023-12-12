class Entity {
    /*
    すべてのエンティティの親クラス
    */

    constructor (display_height, display_width, x, y, args) {
        /*
        コントラスタ
        args:継承のときにうまいこと使ってください
        */

        //画面の大きさ
        this.display_height = display_height;
        this.display_width = display_width;

        //生成から何フレーム経過したか
        this.timer = 0;
        //アニメーションの現在のフレーム
        this.current_frame = 0;

        //アニメーションの更新速度
        this.animation_speed = 0;
        //アニメーション雛型
        this.animation_height = 0;
        this.animation_width = 0;
        this.animation = [[[]]];
        //アニメーションの設定
        this.init_animation(args);

        //コライダー雛型
        this.collider_height = 0;
        this.collider_width = 0;
        this.collider = [[[]]];
        //コライダーの設定
        this.init_collider(args);

        //最大サイズの雛型
        this.height = Math.max(this.animation_height, this.collider_height);
        this.width = Math.max(this.animation_width, this.collider_width);

        //生成位置x
        if (x === undefined) {//もし指定がなければ画面外、右
            this.x = this.display_width;
        } else {
            this.x = x;
        }

        //生成位置y
        if (y === undefined) {//もし指定がなければ画面内で一番下-1
            this.y = this.display_height - this.height - 1;
        } else {
            this.y = y;
        }
    }

    init_animation(args) {
        /*
        アニメーションの設定
        0無色1黒2白として、二次元配列をフレームの数だけ重ねる
        オーバーライド推奨
        */
    }

    init_collider(args) {
        /*
        コライダーの設定
        0判定なし、1より大きければ判定ありとして、二次元配列をフレームの数だけ重ねる
        コライダーはアニメーションと同じ長さであること
        デフォルトはアニメーションのコピー
        */
        this.collider_height = this.animation_height;
        this.collider_width = this.animation_width;
        this.collider = this.animation;
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
                if (this.timer % this.animation_speed * this.animation.length == this.animation_speed * i) {
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
