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
exports.create = exports.updateProgress = exports.createProgress = exports.getSingleProgress = exports.getProgress = void 0;
const UserProgressController_1 = __importDefault(require("./UserProgressController"));
const getProgress = (progress) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return progress.list(input);
});
exports.getProgress = getProgress;
const getSingleProgress = (progress) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return progress.getSingleProgress(input);
});
exports.getSingleProgress = getSingleProgress;
const createProgress = (progress) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield progress.create(req);
});
exports.createProgress = createProgress;
const updateProgress = (progress) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield progress.update(input);
});
exports.updateProgress = updateProgress;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const progress = yield UserProgressController_1.default.create(data);
        return {
            getList: (0, exports.getProgress)(progress),
            getSingleProgress: (0, exports.getSingleProgress)(progress),
            create: (0, exports.createProgress)(progress),
            update: (0, exports.updateProgress)(progress),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserProgressHandlers.js.map