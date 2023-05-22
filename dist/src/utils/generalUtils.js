"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationCode = exports.randomChars = void 0;
const randomChars = count => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: count }, () => possible[Math.floor(Math.random() * possible.length)]).join('');
};
exports.randomChars = randomChars;
const generateVerificationCode = () => {
    const numbers = Math.floor(1000 + Math.random() * 9000);
    const fourLetterString = (0, exports.randomChars)(4);
    return `${fourLetterString}-${numbers}`;
};
exports.generateVerificationCode = generateVerificationCode;
//# sourceMappingURL=generalUtils.js.map