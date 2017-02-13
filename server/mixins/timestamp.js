module.exports = function(Model, options) {
    'use strict';

    Model.defineProperty('createdAt', {type: Date});
    Model.defineProperty('updatedAt', {type: Date});

    //Automatically update updatedAt on save
    Model.observe('before save', function event(ctx, next) {
        if(ctx.instance) {
            if (ctx.isNewInstance) {
                ctx.instance.createdAt = new Date();
            } else {
                ctx.instance.updatedAt = new Date();
            }
        }
        else {
            if (ctx.isNewInstance) {
                ctx.data.createdAt = new Date();
            } else {
                ctx.data.updatedAt = new Date();
            }
        }
        next();
    });
}