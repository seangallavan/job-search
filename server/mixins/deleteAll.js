 module.exports = function(Model, options) {
   //No need to define Model.deleteAll, it already exists
    Model.remoteMethod(
        'deleteAll',
        {
            http: {
                path: '/',
                verb: 'del'
            },

        }
    )

}