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

    draw() {
        /*
        ゲーム画面の描写
        */

        //長くなるのでよく使う単語を略す
        const ctx = this.ctx
        const h = this.game.height
        const w = this.game.width
        const bs = this.blockSize
        const es = this.game.entities.entities

        //キャンバスの初期化
        this.clear();

        //地面の描画
        this.ctx.fillRect(0, bs*(h-1), bs*w, bs);
        
        //エンティティの描画
        for (let i = 0; i < es.length; i++) {
            this.draw_entity(es[i])
        }

        //待機画面のとき
        if (this.game.is_standby) {
            let tap_to_start = new Chars("TAP TO START");
            //右上揃えにする
            tap_to_start.set_xy(w - tap_to_start.width, 0);
            this.draw_entity(tap_to_start);
            return;
        }

        //ゲームオーバーのとき
        if (this.game.is_over) {
            let gameover_chars = new Chars("GAMEOVER");
            //中央揃えにする
            gameover_chars.set_xy(
                parseInt((w - gameover_chars.width) * 0.5),
                parseInt((h - gameover_chars.height) * 0.5)
                );
            this.draw_entity(gameover_chars, ctx);
        }

        //scoreの桁数調整
        let score_string = ""
        for (let i = 0; i < 4 - String(this.game.score).length; i++) {
            score_string += "0";
        }
        score_string += String(this.game.score);
        
        let level_and_score = new Chars(
            "LEVEL" + String(this.game.level) + " SCORE " + score_string);
        //右上揃えにする
        level_and_score.set_xy(w - level_and_score.width, 0);
        this.draw_entity(level_and_score);
    }

    clear() {
        /*
        キャンバスの初期化
        */
        this.ctx.clearRect(0, 0, this.blockSize*this.game.width, this.blockSize*this.game.height);
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
                    this.ctx.fillRect(this.blockSize*x, this.blockSize*y, this.blockSize, this.blockSize);
                //白
                } else if (color == 2) {
                    this.ctx.clearRect(this.blockSize*x, this.blockSize*y, this.blockSize, this.blockSize);
                }
            }
        }
    }
}