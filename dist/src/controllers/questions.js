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
exports.updateQuestion = exports.createQuestion = exports.getQuestion = exports.getQuestions = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const QuestionHandlers_1 = __importDefault(require("../data/questions/QuestionHandlers"));
const omit_1 = __importDefault(require("omit"));
exports.getQuestions = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const questions = yield (yield QuestionHandlers_1.default.create(data)).getList();
    res.respond({
        body: req.body,
        data: questions
    });
}));
exports.getQuestion = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield DataProvider_1.default.create();
    const question = yield (yield QuestionHandlers_1.default.create(data)).get({ id });
    res.respond({
        data: question
    });
}));
exports.createQuestion = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { question, option_one, option_two, option_three, option_four, options_answer, video, wrong_video_url, reason_one, reason_two, reason_three, reason_four, only_media, option_a_ee_score, option_a_et_score, option_a_eb_score, option_b_ee_score, option_b_et_score, option_b_eb_score, option_c_ee_score, option_c_et_score, option_c_eb_score, option_d_ee_score, option_d_et_score, option_d_eb_score, } = req.body;
    const options = {
        option_one,
        option_two,
        option_three,
        option_four,
        options_answer,
        reason_one,
        reason_two,
        reason_three,
        reason_four,
        option_a_ee_score, option_a_et_score, option_a_eb_score,
        option_b_ee_score, option_b_et_score, option_b_eb_score,
        option_c_ee_score, option_c_et_score, option_c_eb_score,
        option_d_ee_score, option_d_et_score, option_d_eb_score,
    };
    const body = Object.assign(Object.assign({}, req.body), { question, options: options, wrong_video_url, video: video === null || video === void 0 ? void 0 : video.value, only_media });
    console.log("options", body);
    const questionsBodyObject = (0, omit_1.default)(["option_one", "option_two", "option_three",
        "option_four", "options_answer", "reason_one", "reason_two",
        "reason_three", "reason_four",
        "option_a_ee_score", "option_a_et_score", "option_a_eb_score",
        "option_b_ee_score", "option_b_et_score", "option_b_eb_score",
        "option_c_ee_score", "option_c_et_score", "option_c_eb_score",
        "option_d_ee_score", "option_d_et_score", "option_d_eb_score"
    ], body);
    const inserted = yield (yield QuestionHandlers_1.default.create(data)).create(questionsBodyObject);
    res.respond({
        data: inserted
    });
}));
exports.updateQuestion = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { id, question, option_one, option_two, option_three, option_four, options_answer, reason_one, reason_two, reason_three, reason_four, option_a_ee_score, option_a_et_score, option_a_eb_score, option_b_ee_score, option_b_et_score, option_b_eb_score, option_c_ee_score, option_c_et_score, option_c_eb_score, option_d_ee_score, option_d_et_score, option_d_eb_score, } = req.body;
    console.log("Body", req.body);
    const options = {
        option_one,
        option_two,
        option_three,
        option_four,
        options_answer,
        reason_one,
        reason_two,
        reason_three,
        reason_four,
        option_a_ee_score, option_a_et_score, option_a_eb_score,
        option_b_ee_score, option_b_et_score, option_b_eb_score,
        option_c_ee_score, option_c_et_score, option_c_eb_score,
        option_d_ee_score, option_d_et_score, option_d_eb_score,
    };
    const body = Object.assign(Object.assign({}, req.body), { id,
        question, options: options });
    console.log("options", body);
    const questionsBodyObject = (0, omit_1.default)(["option_one", "option_two", "option_three",
        "option_four", "options_answer", "reason_one", "reason_two",
        "reason_three", "reason_four", "enabled",
        "option_a_ee_score", "option_a_et_score", "option_a_eb_score",
        "option_b_ee_score", "option_b_et_score", "option_b_eb_score",
        "option_c_ee_score", "option_c_et_score", "option_c_eb_score",
        "option_d_ee_score", "option_d_et_score", "option_d_eb_score"
    ], body);
    console.log("Questions Body Object", questionsBodyObject);
    const inserted = yield (yield QuestionHandlers_1.default.create(data)).update(questionsBodyObject);
    res.respond({
        data: inserted
    });
}));
//# sourceMappingURL=questions.js.map