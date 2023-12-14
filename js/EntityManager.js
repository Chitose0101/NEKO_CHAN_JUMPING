class EntityManager {
    /*
    ゲーム内のエンティティの管理
    */

    constructor(height, width) {
        /*
        コンストラクタ
        */

        //画面の高さと幅
        this.height = height;
        this.width = width;

        //ﾈｺﾁｬﾝ生成
        this.cat = new Cat(this.height, this.width);
        //敵リスト
        this.enemies = [];
        //エンティティのリスト
        this.entities = [this.cat];
    }

    update_enemies(level) {
        /*
        敵の更新
        */

        //更新後の敵リストの雛型
        let updated_enemies = [];

        //新しい敵を生成する
        const new_enemy = this.spawn_enemy(level);

        //画面内にいる敵は引き継ぐ
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].x + this.enemies[i].width >= 0) {
                updated_enemies.push(this.enemies[i]);
            } else {
                delete this.enemies[i];
            }
        }

        //新しい敵がいればリストに追加
        if (new_enemy instanceof Runner) {
            updated_enemies.push(new_enemy); 
        }
        
        //更新
        this.enemies = updated_enemies;

        //エンティティリストの更新
        this.entities = [this.cat];
        for (let i = 0; i < this.enemies.length; i++) {
            this.entities.push(this.enemies[i]);
        }
    }

    spawn_enemy(level) {
        /*
        敵を生成する
        */
        
        //もし近くに敵がいれば、何もしない
        for (let i = 0; i < this.enemies.length; i++) {
            let interval = this.cat.collider_width * 2.5 + this.enemies[i].collider_width * level;
            if (this.width - this.enemies[i].x < interval  + this.enemies[i].collider_width) {
                return;
            }
        }

        //敵を生成するか決める
        let probabillity = 1/30;
        let random = Math.random();
        if (random > probabillity) {
            return;
        }

        //どの敵を生成するか決める
        random = Math.random();
        let new_enemy = null;
        if (random < 0.01) {
            new_enemy = new EnemyCat(this.height,this.width);
        } else if (random < 0.21) {
            new_enemy = new Bird(this.height, this.width);
        } else {
            new_enemy = new Flower(this.height, this.width);
        }

        return new_enemy;
    }

    add_heart() {
        /*
        ﾈｺﾁｬﾝの上にハートを出す
        */

        //*はハートに変換される
        const heart = new Chars(this.height, this.width, "*");
        heart.set_xy(
            this.cat.x + this.cat.animation_width - 5,
            this.cat.y - heart.animation_height + 2
            );
        this.entities.push(heart);
    }
}
