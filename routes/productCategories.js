var express = require('express');
var router = express.Router();
var CategoryHandler = require('../handlers/productCategories');
var authStackMiddleware = require('../helpers/checkAuth');
var MODULES = require('../constants/modules');

module.exports = function (models, event) {
    var handler = new CategoryHandler(models, event);

    var moduleId = MODULES.PRODUCTSETTINGS;
    var accessStackMiddleware = require('../helpers/access')(moduleId, models);

    router.use(authStackMiddleware);
    router.use(accessStackMiddleware);

    router.get('/', handler.getForDd);
    router.get('/getExpenses', handler.getExpenses);
    router.get('/posterity/:id', handler.getProsterityForAncestor);
    router.get('/:id', handler.getById);

    router.post('/', handler.create);
    router.put('/:id', handler.update);

    router.delete('/:id', handler.remove);

    return router;
};
