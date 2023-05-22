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
exports.create = exports.getVideoById = exports.createVideo = exports.getVideoList = void 0;
const VideoController_1 = __importDefault(require("./VideoController"));
const getVideoList = (video) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield video.getList(req);
});
exports.getVideoList = getVideoList;
const createVideo = (video) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield video.create(req);
});
exports.createVideo = createVideo;
const getVideoById = (video) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield video.getById(id);
});
exports.getVideoById = getVideoById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield VideoController_1.default.create(data);
        return {
            getList: (0, exports.getVideoList)(video),
            create: (0, exports.createVideo)(video),
            getById: (0, exports.getVideoById)(video)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=VideoHandlers.js.map