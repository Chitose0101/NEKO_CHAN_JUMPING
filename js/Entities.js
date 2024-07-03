class Entities {
    /*
    ゲーム内のエンティティの管理
    */

    constructor(height, width) {
        /*
        コントラスタ
        height:縦サイズ
        width:横サイズ
        */
        this.height = height;
        this.width = width;

        this.reset();
    }

    reset() {
        /*
        エンティティの初期化
        */

        //エンティティのリスト
        this.entities=[];
        //ﾈｺﾁｬﾝ生成
        this.cat = new Cat(this.height, 16);
        this.entities.push(this.cat);
        //誰が殺したか
        this.killer = null;
    }

    click_event() {
        /*
        クリック時のイベント
        */
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].click_event();
        }
    }

    timing_event(level) {
        /*
        フレームごとのイベント
        */
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].timing_event(level);
        }
    }

    update_entities(level) {
        /*
        エンティティのリストの更新
        */

        //画面外の敵を消す
        this.delete_outside_enemies();
        
        //更新後のエンティティリストの雛型
        let updated_entities = [];

        //エンティティリストの整理
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] instanceof Entity) {
                updated_entities.push(this.entities[i]);
            }
        }
        this.entities = updated_entities;

        //新しい敵を生成する
        const new_enemy = this.spawn_enemy(level);
        //新しい敵がいればリストに追加
        if (new_enemy instanceof Entity) {
            this.entities.push(new_enemy); 
        }
    }

    delete_outside_enemies() {
        /*
        画面外の敵を消す
        */
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].is_enemy) {
                if (this.entities[i].x + this.entities[i].width < 0) {
                    delete this.entities[i];
                }
            }
        }
    }

    spawn_enemy(level) {
        /*
        敵を生成する
        Entity
        */
        
        //もし近くに敵がいれば、何もしない
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].is_enemy) {
                let interval = this.cat.collider_width * 2.5 + this.entities[i].collider_width * level;
                if (this.width - this.entities[i].x < interval  + this.entities[i].collider_width) {
                    return;
                }
            }
        }

        //敵を生成するか決める
        let probabillity = 1/20;
        let random = Math.random();
        if (random > probabillity) {
            return;
        }

        //どの敵を生成するか決める
        let new_enemy = null
        random = Math.random();
        if (random < 0.01) {
            new_enemy = new EnemyCat(this.height, this.width, level);
        } else if (random < 0.2) {
            new_enemy = new Bird(this.height, this.width, level);
        } else if (random < 0.35) {
            new_enemy = new HighFlower(this.height, this.width, level);
        } else if (random < 0.5) {
            new_enemy = new LowFlower(this.height, this.width, level);
        } else {
            new_enemy = new Flower(this.height, this.width, level);
        }

        return new_enemy;
    }

    check_gameover() {
        /*
        ゲームオーバーの判定、死因の更新
        boolean
        */
        
        //すべてのﾈｺﾁｬﾝ座標について
        for (let y = this.cat.y; y < this.cat.y + this.cat.collider_height; y++) {
            for (let x = this.cat.x; x < this.cat.x + this.cat.collider_width; x++) {
                //ﾈｺﾁｬﾝがいるか
                if (this.cat.exists(x, y)){
                    //いずれかの敵がいるか
                    let enemy = this.exists_any_enemy(x, y);
                    if (this.exists_any_enemy(x, y) instanceof Entity ) {
                        this.killer = enemy;
                        return true;
                    }
                }
            }
        }

        return false;
    }

    exists_any_enemy(x, y) {
         /*
        いずれかの敵がいるか
        Entity
        */

        //すべてのエンティティについて
        for (let i = 0; i < this.entities.length; i++) {
            //敵か
            if (this.entities[i].is_enemy) {
                if (this.entities[i].exists(x, y)){
                    return this.entities[i];         
                }
            }
        }
        return null;
    }

    add_heart() {
        /*
        ﾈｺﾁｬﾝの上にハートを出す
        */

        //*はハートに変換される
        const heart = new Chars("*"); 
        heart.set_xy(
            this.cat.x + this.cat.animation_width - 5,
            this.cat.y - heart.animation_height + 2
            );
        this.entities.push(heart);
    }
}
