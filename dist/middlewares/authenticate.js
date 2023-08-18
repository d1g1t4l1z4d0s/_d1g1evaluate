"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utilities/jwt");
const authenticate = (req, res, next) => {
    try {
        let token = null;
        const authorization = req.headers.authorization;
        if (typeof authorization === 'string')
            token = ridOfBearer(authorization);
        else {
            res.status(400).json({ error: 'No authorization headers' });
            return;
        }
        if (token !== null) {
            req.user = (0, jwt_1.decryptToken)(token)._id;
            return next();
        }
        req.user = undefined;
        res.status(400).json({ error: 'Wrong method to send token' });
    }
    catch (err) {
        const error = err;
        if ((error === null || error === void 0 ? void 0 : error.name) === 'JsonWebTokenError')
            res.status(500).json({ error: 'Token error' });
        else if ((error === null || error === void 0 ? void 0 : error.name) === 'TokenExpiredError')
            res.status(500).json({ error: 'Token expired' });
    }
};
exports.authenticate = authenticate;
const ridOfBearer = (authorizationStr) => {
    const [bearer, token] = authorizationStr.split(' ');
    if (bearer !== undefined) {
        if (bearer.toLocaleLowerCase() === 'bearer')
            return token;
    }
    return null;
};
