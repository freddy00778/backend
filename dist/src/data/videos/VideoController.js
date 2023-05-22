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
exports.create = exports.createVideo = exports.getVideo = exports.getVideoList = void 0;
const VideoData_1 = __importDefault(require("./VideoData"));
const getVideoList = (video) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return video.getList(input);
});
exports.getVideoList = getVideoList;
const getVideo = (video) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return video.getById(id);
});
exports.getVideo = getVideo;
const createVideo = (video) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return video.create(input);
});
exports.createVideo = createVideo;
// export const updateProduct = (product: Data) => async (input?: CreateInput) => {
//   return product.update(input)
// }
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const videos = yield VideoData_1.default.create(data);
        return {
            getList: (0, exports.getVideoList)(videos),
            getById: (0, exports.getVideo)(videos),
            create: (0, exports.createVideo)(videos),
            // update: updateVideo(videos)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=VideoController.js.map