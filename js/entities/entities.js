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

        // default acceleration vector
        // this.body.setVelocity(3, 15); // TODO try to understand this

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
            this.body.vel -= this.body.accel.x * me.timer.tick;
        } else if(me.input.isKeyPressed('rigth')) {
            this.body.vel += this.body.accel.x * me.timer.tick;
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
