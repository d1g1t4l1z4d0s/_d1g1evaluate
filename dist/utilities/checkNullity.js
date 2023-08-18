"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArrayNullity = exports.checkObjectNullity = void 0;
function checkObjectNullity(object) {
    if (object !== null && typeof object === 'object')
        return Object.keys(object).length > 0 ? object : null;
    return null;
}
exports.checkObjectNullity = checkObjectNullity;
function checkArrayNullity(array) {
    if (array !== null && typeof array === 'object')
        return array.length > 0 ? array : null;
    return null;
}
exports.checkArrayNullity = checkArrayNullity;
