"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserLicenseStatus = exports.getUserLicenses = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
// import UserHandlers from "../data/users/UserHandlers";
const UserLicenseHandlers_1 = __importDefault(require("../data/userLicense/UserLicenseHandlers"));
exports.getUserLicenses = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { license, team } = req.body;
    const licenseBody = {
        license,
        team
    };
    const userLicenses = yield (yield UserLicenseHandlers_1.default.create(data)).getByLicenseId(licenseBody);
    const licenses = Array.from(new Set(userLicenses.map(obj => obj.id))).map(id => {
        return userLicenses.find(obj => obj.id === id);
    });
    res.respond({
        body: req.body,
        data: licenses
    });
}));
exports.updateUserLicenseStatus = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { license, user } = req.body;
    const licenseBody = Object.assign(Object.assign({}, req.body), { license,
        user });
    const userLicenses = yield (yield UserLicenseHandlers_1.default.create(data)).updateStatus(licenseBody);
    res.respond({
        body: req.body,
        data: userLicenses
    });
}));
//# sourceMappingURL=licenses.js.map