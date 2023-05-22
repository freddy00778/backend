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
exports.createVideo = exports.getById = exports.getAll = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const VideoHandlers_1 = __importDefault(require("../data/videos/VideoHandlers"));
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("file");
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req);
    const data = yield DataProvider_1.default.create();
    const videos = yield (yield VideoHandlers_1.default.create(data)).getList();
    return res.respond({
        videos
    });
}));
exports.getById = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield DataProvider_1.default.create();
    const video = yield (yield VideoHandlers_1.default.create(data)).getById(id);
    return res.respond({
        video
    });
}));
function uploadToS3(fileObject, media_extension) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = new aws_sdk_1.default.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            region: "eu-west-1"
        });
        const imagePath = `${fileObject.destination}/${fileObject.filename}${media_extension}`;
        const blob = fs_1.default.readFileSync(imagePath);
        //@ts-ignore
        const uploadedImage = yield s3.upload({
            //@ts-ignore
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileObject.filename + media_extension,
            Body: blob,
            ContentType: fileObject.mimetype
        }).promise();
        return uploadedImage;
    });
}
function renameFile(fileObject, media_extension) {
    fs_1.default.rename(`${fileObject.destination}/${fileObject.filename}`, `${fileObject.destination}/${fileObject.filename}${media_extension}`, function (err) {
        if (err)
            console.log('ERROR: ' + err);
    });
}
exports.createVideo = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    yield upload(req, res, (err) => {
        if (err) {
            res.status(400).send("Something went wrong!");
        }
        // @ts-ignore
        let fileObject = req.file;
        VideoHandlers_1.default.create(data)
            .then((video) => __awaiter(void 0, void 0, void 0, function* () {
            const name = fileObject.originalname;
            const media_extension = name.substr(Number(name.indexOf(".")));
            console.log("Media extension", media_extension);
            console.log("Media name extension", name.indexOf("."));
            renameFile(fileObject, media_extension);
            // const new_name = `${fileObject.destination}/${fileObject.filename}${media_extension}`
            const uploadedImage = yield uploadToS3(fileObject, media_extension);
            const videoBody = Object.assign(Object.assign({}, req.body), { name: fileObject.originalname, mime_type: fileObject.mimetype, size: fileObject.size, 
                // link: `${fileObject.destination}${fileObject.filename}${media_extension}`
                link: uploadedImage.Location });
            video.create(videoBody);
            console.log("Uploaded image", uploadedImage);
        }));
        // @ts-ignore
        res.send(req.file);
    });
}));
//# sourceMappingURL=videos.js.map