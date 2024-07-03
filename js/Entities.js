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
        //エンティティの集合
        this.entities = new Set();

        this.reset();
    }

    reset() {
        /*
        エンティティの初期化
        */
        this.entities.clear();
        //ﾈｺﾁｬﾝ生成
        this.cat = new Cat(this.height, 16);
        this.entities.add(this.cat);
        //誰が殺したか
        this.killer = null;
    }

    click_event() {
        /*
        クリック時のイベント
        */
        this.entities.forEach(function(entity){
            entity.click_event();
        })
    }

    timing_event(level) {
        /*
        フレームごとのイベント
        */

        //エンティティのリストの更新
        this.update_entities(level)

        //エンティティにフレームごとの処理をさせる
        this.entities.forEach(function(entity){
            entity.timing_event(level);
         })
    }

    update_entities(level) {
        /*
        エンティティのリストの更新
        */

        //画面外の敵を消す
        this.delete_outside_enemies();

        //確率で新しい敵を生成する
        if (this.check_spawnable(level)) {
            this.spawn_enemy(level);
        }
    }

    delete_outside_enemies() {
        /*
        画面外の敵を消す
        */
        this.entities.forEach(function(entity){
            if (entity.is_enemy) {
                if (entity.x + entity.width < 0) {
                    this.entities.delete(entity);
                }
            }
         }, this)
    }

    check_spawnable(level) {
        /*
        敵を生成するか
        boolean
        */

        //もし近くに敵がいれば、何もしない
        let closed_enemy = null
        this.entities.forEach(function(entity){
            if (entity.is_enemy) {
                let interval = this.cat.collider_width * 2.5 + entity.collider_width * level;
                if (this.width - entity.x < interval  + entity.collider_width) {
                    closed_enemy = entity;
                }
            }
         }, this)
         if (closed_enemy instanceof Entity) {
            return false;
         }

        //確率でスポーン
        let probabillity = 1/20;
        let random = Math.random();
        if (random > probabillity) {
            return false;
        }

        return true;
    }

    spawn_enemy(level) {
        /*
        敵を生成する
        */
        let new_enemy = null
        let random = Math.random();
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

        this.entities.add(new_enemy);
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
        let killer = null
        this.entities.forEach(function(entity){
            if (entity.is_enemy) {
                if (entity.exists(x, y)) {
                    killer =entity;
                }
            }
         })
        return killer;
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
        this.entities.add(heart);
    }
}
