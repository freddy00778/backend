"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRespondToResponse = void 0;
const addRespondToResponse = (_req, res, next) => {
    res.respond = (data) => {
        res.status(200).send(data);
    };
    next();
};
exports.addRespondToResponse = addRespondToResponse;
//# sourceMappingURL=response.js.map