"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./config/index"));
const app_1 = __importDefault(require("./app"));
require("./config/database-connection");
app_1.default
    .listen(app_1.default.get('port'), () => {
    if (index_1.default.node_env !== 'production')
        console.log(`Server is initialized and working in port ${app_1.default.get('port')}`);
});
