//敵まとめ

class Flower extends Runner{
    /*
    花のクラス
    */
    
    init_animation() {
        /*
        アニメーションの設定
        親クラスのオーバーライド
        */
        this.animation_height = 16;
        this.animation_width = 16;

        this.animation = [[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,1,2,2,2,1,0,0,0,0,0,0,0,0],
            [0,0,1,2,2,2,2,2,1,0,0,0,0,0,0,0],
            [0,0,1,2,2,1,2,2,1,0,0,0,0,0,0,0],
            [0,0,1,2,2,2,2,2,1,0,0,0,0,0,0,0],
            [0,0,0,1,2,2,2,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
            [1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0],
            [1,2,1,1,0,1,0,1,1,2,1,0,0,0,0,0],
            [0,1,2,1,0,1,0,1,2,1,0,0,0,0,0,0],
            [0,1,1,1,0,1,0,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        ]];
    }
}


class Bird extends Runner{
    /*
    鳥のクラス
    */

    constructor(display_height, display_width, x, y) {
        /*
        コントラスタ
        */
        super(display_height, display_width, x, y);
        this.y = 15;
    }
    
    init_animation() {
        /*
        アニメーションの設定
        親クラスのオーバーライド
        */
        this.animation_speed = 10;
        this.animation_height = 16;
        this.animation_width = 16;

        this.animation = [[
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0],
                [0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0],
                [0,1,2,2,1,2,2,2,2,1,1,1,1,1,0,0],
                [1,1,2,2,2,2,2,2,1,2,2,2,2,1,0,0],
                [0,1,2,2,2,2,2,1,2,2,2,2,1,0,0,0],
                [0,0,1,2,2,2,2,1,2,2,2,1,1,1,0,0],
                [0,0,0,1,2,2,2,2,1,1,1,2,2,2,1,1],
                [0,0,0,0,1,2,2,2,2,2,2,2,1,1,1,0],
                [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
            ],[
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0],
                [0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0],
                [0,1,2,2,1,2,2,2,2,1,0,0,0,0,0,0],
                [1,1,2,2,2,2,2,2,1,1,1,0,0,0,0,0],
                [0,1,2,2,2,2,2,1,2,2,2,1,0,0,0,0],
                [0,0,1,2,2,2,2,1,2,2,2,2,1,1,0,0],
                [0,0,0,1,2,2,2,2,1,2,2,2,1,2,1,1],
                [0,0,0,0,1,2,2,2,2,1,1,2,2,1,1,0],
                [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
        ]];
    }
}
