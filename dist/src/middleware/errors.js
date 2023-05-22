"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const lodash_1 = require("lodash");
const Sentry = __importStar(require("@sentry/node"));
const errors_1 = require("../errors");
const handleError = (error, _req, res, _next) => {
    console.error(error);
    const isErrorSafeForClient = error instanceof errors_1.CustomError;
    const clientError = isErrorSafeForClient
        ? (0, lodash_1.pick)(error, ['message', 'code', 'status', 'data'])
        : {
            message: 'Something went wrong.',
            code: 'INTERNAL_ERROR',
            status: 500,
            data: {},
        };
    Sentry.captureException(clientError);
    res.status(clientError.status).send({ error: clientError });
};
exports.handleError = handleError;
//# sourceMappingURL=errors.js.map