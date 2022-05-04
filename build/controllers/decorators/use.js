"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
var MetaK_1 = require("./MetaK");
function use(middleware) {
    return function (target, key, desc) {
        var middlewares = Reflect.getMetadata(MetaK_1.MetadataKeys.middleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(MetaK_1.MetadataKeys.middleware, middlewares, target, key);
    };
}
exports.use = use;
