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
        this.body.setVelocity(5, 5);

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
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if(me.input.isKeyPressed('right')) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else if(me.input.isKeyPressed('up')) {
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if(me.input.isKeyPressed('down')) {
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        } else {
            this.body.vel.x = 0;
            this.body.vel.y = 0;
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

/* Hole Entity */
game.HoleEntity = me.CollectableEntity.extend({

    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y, settings]);
    },

    onCollision : function (response, other) {
        // TODO lose points
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        return false;
    }

});
