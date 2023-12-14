class Glaphic {
    /*
    グラフィックを司るクラス
    */

    constructor(boardRow, boardCol, blockSize) {
        /*
        コントラスタ
        boardRow:グラフィックの縦サイズ
        boardCol:グラフィックの横サイズ
        blockSize:ドットの大きさ
        */
        this.boardRow = boardRow;
        this.boardCol = boardCol;
        this.blockSize = blockSize;
    }

    set_blockSize(blockSize) {
        /*
        blockSizeのセッター
        */
        this.blockSize = blockSize;
    }

    draw_entity(entity, ctx) {
        /*
        エンティティを塗るためのメソッド
        entity:対象のエンティティ
        ctx:コンテキストオブジェクト
        */
        //xy座標について
        for (let y = entity.y; y < entity.y + entity.animation_height; y++) {
            for (let x = entity.x; x < entity.x + entity.animation_width; x++) {

                let color = entity.color(x,y);
                //黒
                if (color == 1) {
                    ctx.fillRect(this.blockSize*x, this.blockSize*y, this.blockSize, this.blockSize);
                //白
                } else if (color == 2) {
                    ctx.clearRect(this.blockSize*x, this.blockSize*y, this.blockSize, this.blockSize);
                }
            }
        }
    }

    draw_game(entities, ctx) {
        /*
        ゲーム画面を描写するメソッド
        entities:描くエンティティ
        ctx:コンテキストオブジェクト
        */

        //キャンバスの初期化
        ctx.clearRect(0, 0, this.blockSize*this.boardCol, this.blockSize*this.boardRow);

        //地面の描画
        for (let x = 0; x < this.boardCol; x++) {
            ctx.fillRect(this.blockSize*x, this.blockSize*(this.boardRow-1), this.blockSize, this.blockSize);
        }

        //エンティティの描画
        for (let i = 0; i < entities.length; i++) {
            this.draw_entity(entities[i], ctx)
        }
    }

    draw_info(level, score, standby, is_gameover, ctx) {
        /*
        文字情報を表示するメソッド
        level:レベル
        score:スコア
        standby:待機状態かどうか
        isgameover:ゲームオーバーかどうか
        ctx:コンテキストオブジェクト
        */


        //待機画面のとき
        if (standby) {
            let tap_to_start = new Chars(this.boardRow, this.boardCol, "TAP TO START");
            //右上揃えにする
            tap_to_start.set_xy(this.boardCol - tap_to_start.width, 0);
            this.draw_entity(tap_to_start, ctx);
            return;
        }

        //ゲームオーバーのとき
        if (is_gameover) {
            let gameover_chars = new Chars(this.boardRow, this.boardCol, "GAMEOVER");
            //中央揃えにする
            gameover_chars.set_xy(
                parseInt((this.boardCol - gameover_chars.width) * 0.5),
                parseInt((this.boardRow - gameover_chars.height) * 0.5)
                );
            this.draw_entity(gameover_chars, ctx);
        }

        //scoreの桁数調整
        let score_string = ""
        for (let i = 0; i < 4 - String(score).length; i++) {
            score_string += "0";
        }
        score_string += String(score);
        
        let level_and_score = new Chars(this.boardRow, this.boardCol,
            "LEVEL" + String(level) + " SCORE " + score_string);
        //右上揃えにする
        level_and_score.set_xy(this.boardCol - level_and_score.width, 0);
        this.draw_entity(level_and_score, ctx);
    }
}
