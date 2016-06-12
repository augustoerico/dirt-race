/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.gravity = 0
        // this.body.setVelocity(0, 0);


        // viewport follows our position
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        // update even when outside of the viewport
        this.alwaysUpdate = true;
    },

    /**
     * update the entity
     */
    update : function (dt) {

        if(me.input.isKeyPressed('left')) {
            console.log("left");
            // this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.body.vel.x = -10
        } else if(me.input.isKeyPressed('right')) {
            console.log("right");
            // this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.body.vel.x = 10
        } else if(me.input.isKeyPressed('up')) {
            console.log("up");
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if(me.input.isKeyPressed('down')) {
            console.log("down");
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        }

        // TODO increment velocity

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});
