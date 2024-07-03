class Glaphic {
    /*
    グラフィックを司るクラス
    */

    constructor(game, cvs, blockSize) {
        /*
        コントラスタ
        game:ゲーム
        cvs:キャンバス
        blockSize:ドットの大きさ
        */
        this.game = game;
        this.cvs = cvs;
        this.blockSize = blockSize;

        //コンテキスト生成
        this.ctx = cvs.getContext("2d");
    }

    set_blockSize(blockSize) {
        /*
        blockSizeのセッター
        */
        this.blockSize = blockSize
    }

    draw_game() {
        /*
        ゲーム画面の描写
        */

        //キャンバスの初期化
        this.clear();

        //エンティティの描画
        this.game.entities.entities.forEach(function(entity){
            this.draw_entity(entity);
        }, this)

        //地面の描画
        this.draw_floor();

        //右上に描くもの
        let ur = "";
        if (this.game.is_standby) {
            ur = "TAP TO START";
        } else {
            ur = this.create_level_and_score();
        }
        this.set_char_ur(ur);

        //中央にゲームオーバー
        if (this.game.is_over) {
            this.set_char_mm("GAMEOVER")
        }
    }

    clear() {
        /*
        キャンバスの初期化
        */
        this.clear_dot(0, 0, this.game.width, this.game.height);
    }

    draw_floor() {
        /*
        地面の描画
        */
        this.fill_dot(0, this.game.height - 1, this.game.width, 1);
    }

    create_level_and_score() {
        /*
        level,scoreの文字列作成
        string
        */
        let score_string = ""
        for (let i = 0; i < 4 - String(this.game.score).length; i++) {
            score_string += "0";
        }
        score_string += String(this.game.score);
        
        return "LEVEL" + String(this.game.level) + " SCORE " + score_string
    }

    set_char_ur(src) {
        /*
        右上に文字を表示する
        src文字列
        */
        let chars = new Chars(src);
        chars.set_xy(this.game.width - chars.width, 0);
        this.draw_entity(chars);
    }

    set_char_mm(src) {
        /*
        中央に文字を表示する
        src文字列
        */
        let chars = new Chars(src);
        chars.set_xy(
            parseInt((this.game.width - chars.width) * 0.5),
            parseInt((this.game.height - chars.height) * 0.5)
            );
        this.draw_entity(chars);
    }

    draw_entity(entity) {
        /*
        エンティティを塗るためのメソッド
        entity:対象のエンティティ
        */
        //xy座標について
        for (let y = entity.y; y < entity.y + entity.animation_height; y++) {
            for (let x = entity.x; x < entity.x + entity.animation_width; x++) {

                let color = entity.color(x,y);
                //黒
                if (color == 1) {
                    this.fill_dot(x, y, 1, 1);
                //白
                } else if (color == 2) {
                    this.clear_dot(x, y, 1, 1);
                }
            }
        }
    }

    clear_dot(x, y, width, height) {
        /*
        ドットに合わせて長方形に消す
        */
        this.ctx.clearRect(
            this.blockSize*x,
            this.blockSize*y,
            this.blockSize*width,
            this.blockSize*height,
        );
    }

    fill_dot(x, y, width, height) {
        /*
        ドットに合わせて長方形に塗る
        */
        this.ctx.fillRect(
            this.blockSize*x,
            this.blockSize*y,
            this.blockSize*width,
            this.blockSize*height
        );
    }
}