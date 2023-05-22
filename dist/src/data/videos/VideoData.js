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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getVideoById = exports.updateVideo = exports.createVideo = exports.getVideoList = void 0;
const config_1 = require("../../config");
const getVideoList = (videos) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = videos().select().orderBy("created_at", "desc");
    if (input)
        query.where(input);
    return yield query;
});
exports.getVideoList = getVideoList;
const createVideo = (videos) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield videos().insert(input, ['id', 'name', 'link', 'description']))[0];
});
exports.createVideo = createVideo;
const updateVideo = (videos) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield videos().select().where({ id: input.id }).update(input));
});
exports.updateVideo = updateVideo;
const getVideoById = (videos) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield videos().select().where({ id: id }))[0];
});
exports.getVideoById = getVideoById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const videos = () => data.postgres.withSchema(config_1.Database.schema).table('Video');
        return {
            getList: (0, exports.getVideoList)(videos),
            getById: (0, exports.getVideoById)(videos),
            create: (0, exports.createVideo)(videos),
            update: (0, exports.updateVideo)(videos)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=VideoData.js.map