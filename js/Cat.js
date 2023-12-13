class Cat extends Entity{
    /*
    ﾈｺﾁｬﾝのクラス
    */

    constructor(display_height, display_width, xy) {
        /*
        コントラスタ
        */
        super(display_height, display_width, xy);

        //ジャンプ中か
        this.is_jumping = false;
        //ジャンプしてから何フレーム経過したか
        this.jump_timer = 0;
    }

    init_xy() {
        /*
        xyの初期位置の設定
        親クラスのオーバーライド
        */
        super.init_xy()
        this.init_x = 16;
    }

    jump() {
        /*
        ジャンプ
        */
        if (this.is_jumping == false) {
            this.is_jumping = true;
        }
    }

    jump_height(jump_timer=this.jump_timer) {
        /*
        ジャンプの高さを算出
        */

        //重力加速度g、初速度v、時間t
        const g = 0.9;
        const v = 9;
        let t = jump_timer;

        return parseInt(v*t - g*t*t/2);
    }

    count_jump_timer() {
        /*
        jump_timerの更新
        */

        //もしジャンプ中でなければなら更新しない
        if (this.is_jumping == false) {
            return;
        }
        
        //もし次の高さが0より高ければ、増加
        if (this.jump_height(this.jump_timer + 1) > 0) {
            this.jump_timer += 1;

        //そうでなければ、0
        } else {
            this.jump_timer = 0;
            this.is_jumping = false;
        }
    }

    count() {
        /*
        フレームごとの処理
        親クラスのオーバーライド
        */
        super.count();

        //jump_timerの更新
        this.count_jump_timer();

        //y座標の更新
        this.y = this.display_height - this.height - this.jump_height() - 1;
    }

    init_animation() {
        /*
        アニメーションの設定
        親クラスのオーバーライド
        */
        this.animation_speed = 5;
        this.animation_height = 16;
        this.animation_width = 16;

        this.animation = [[
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
                [0,0,0,0,1,2,1,0,0,0,1,2,1,0,0,0],
                [0,0,0,1,2,2,2,1,1,1,2,2,1,0,0,0],
                [0,0,0,1,2,2,2,2,2,2,2,2,1,0,0,0],
                [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                [0,1,1,2,2,2,1,2,2,2,1,2,2,1,0,0],
                [1,2,1,2,2,2,1,2,2,2,1,2,2,1,0,0],
                [1,2,1,1,2,2,2,2,2,2,2,2,1,0,0,0],
                [0,1,2,2,1,2,2,1,1,1,1,1,0,0,0,0],
                [0,1,2,2,2,2,2,1,0,0,0,0,0,0,0,0],
                [0,1,2,1,2,1,2,1,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
            ],[
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
                [0,0,0,0,1,2,1,0,0,0,1,2,1,0,0,0],
                [0,0,0,1,2,2,2,1,1,1,2,2,1,0,0,0],
                [0,0,0,1,2,2,2,2,2,2,2,2,1,0,0,0],
                [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                [0,1,1,2,2,2,1,2,2,2,1,2,2,1,0,0],
                [1,2,1,2,2,2,1,2,2,2,1,2,2,1,0,0],
                [1,2,1,1,2,2,2,2,2,2,2,2,1,0,0,0],
                [0,1,2,2,1,2,2,1,1,1,1,1,0,0,0,0],
                [0,1,2,2,2,2,2,1,0,0,0,0,0,0,0,0],
                [0,1,1,2,1,2,1,1,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0], 
            ]
        ];
    }

    init_collider() {
        /*
        コライダーの設定
        親クラスのオーバーライド
        */
        this.collider_height = 16;
        this.collider_width = 16;

        //コライダーの設定
        this.collider = [[
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
                [0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ],[
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
                [0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]];
    }
}
