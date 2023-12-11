class Entity {
    /*
    ﾈｺﾁｬﾝのクラス
    */

    constructor (display_height, display_width, x, y) {
        /*
        コントラスタ
        */

        //画面の大きさ
        this.display_height = display_height;
        this.display_width = display_width;

        //コライダー最大サイズの指定

        //形状
        this.set_collider();

        //生成位置x
        if (x === undefined) {//もし指定がなければ画面外、右
            this.x = this.display_width;
        } else {
            this.x = x;
        }

        //生成位置y
        if (y === undefined) {//もし指定がなければ画面内で一番下
            this.y = this.display_height - this.height - 1;
        } else {
            this.y = y;
        }
    }

    set_collider () {
        /*
        コライダーの設定
        */

        //コライダーの最大サイズの指定
        this.height = 16;
        this.width = 16;

        //コライダーの設定
        this.collider = new Array(this.height);
        for (let y = 0; y < this.height; y++) {
            this.collider[y] = new Array(this.width);
            for (let x = 0; x < this.width; x++) {
                this.collider[y][x] = 1;
            }
        }

        //スキンの設定
        this.skin = new Array(this.height);
        for (let y = 0; y < this.height; y++) {
            this.collider[y] = new Array(this.width);
            for (let x = 0; x < this.width; x++) {
                this.collider[y][x] = 1;
            }
        }
    }

    update_collider() {
        /*
        コライダーの更新、アニメーション
        */
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

        //コライダーの最大サイズの中を指定しているか
        if (0 <= x - this.x && x - this.x < this.width) {
            if (0 <= y - this.y && y - this.y < this.height) {
                //指定した座標の値を返す
                return this.skin[y - this.y][x - this.x]
            }
        }
    }

    exists(x,y) {
        /*
        画面上のxy座標にコライダーが存在するか
        x:画面上でのx座標
        y:画面上でのy座標
        */

        //コライダーの最大サイズの中を指定しているか
        if (0 <= x - this.x && x - this.x < this.width) {
            if (0 <= y - this.y && y - this.y < this.height) {
                //指定した座標の値が1かどうか返す
                return this.collider[y - this.y][x - this.x] == 1;
            }
        }
        return false;
    }
}