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
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * generates JWT used for local testing
 */
function generateToken(payloadObject, duration = '48h') {
    // information to be encoded in the JWT
    const payload = {
        payloadObject
    };
    const privateKey = {
        key: fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8'),
        passphrase: "topman"
    };
    // console.log("private key", privateKey.key)
    const signInOptions = {
        algorithm: 'RS256',
        expiresIn: duration
        // expiresIn: '20000'
    };
    return (0, jsonwebtoken_1.sign)(payload, privateKey, signInOptions);
}
exports.generateToken = generateToken;
/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
function validateToken(token) {
    const publicKey = fs.readFileSync(path.join(__dirname, './../../public.pem'));
    const verifyOptions = {
        algorithms: ['RS256'],
    };
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(token, publicKey, verifyOptions, (error, decoded) => {
            if (error)
                return reject(error);
            resolve(decoded);
        });
    });
}
exports.validateToken = validateToken;
//# sourceMappingURL=auth.js.map