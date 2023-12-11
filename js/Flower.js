class Flower extends Runner{
    /*
    花のクラス
    */
    
    set_collider () {
        /*
        コライダーの設定
        */

        //コライダーの最大サイズの指定(デフォルト16*16)
        this.height =16;
        this.width = 16;

        //コライダーの設定
        this.collider = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
            [1,1,1,0,0,1,0,0,1,1,1,0,0,0,0,0],
            [1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,0],
            [0,1,1,1,0,1,0,1,1,1,0,0,0,0,0,0],
            [0,1,1,1,0,1,0,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        ]

        //スキンの設定
        this.skin = [
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
        ]
    }
}