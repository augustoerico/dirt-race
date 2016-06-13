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
            console.log("left"); // TODO remove-me
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if(me.input.isKeyPressed('right')) {
            console.log("right"); // TODO remove-me
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else if(me.input.isKeyPressed('up')) {
            console.log("up"); // TODO remove-me
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if(me.input.isKeyPressed('down')) {
            console.log("down"); // TODO remove-me
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

/* Adversary Entity */
game.AdversaryEntity = me.Entity.extend({

    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);
    },

    update : function (dt) {

        /*
        if (this.alive) {
          if (this.walkLeft && this.pos.x <= this.startX) {
            this.walkLeft = false;
          }
          else if (!this.walkLeft && this.pos.x >= this.endX) {
            this.walkLeft = true;
          }

          // make it walk
          this.renderable.flipX(this.walkLeft);
          this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
        }
        else {
          this.body.vel.x = 0;
        }
        */

    this.body.vel.x = 0;
    this.body.vel.y = 0;

    // update the body movement
    this.body.update(dt);

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },


    onCollision : function (response, other) {
        // TODO lose the game

        // Make all other objects solid
        return true;
    }

    // TODO on update, move forward
});
