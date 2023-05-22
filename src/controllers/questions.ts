import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
import QuestionHandlers from "../data/questions/QuestionHandlers";
import omit from  "omit"


export const getQuestions =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const questions =  await (await QuestionHandlers.create(data)).getList()

        res.respond({
            body: req.body,
            data: questions
        });
    });

export const getQuestion =
    catchErrors(async (req, res) => {
        const {id} = req.params
        const data = await DataProvider.create()
        const question =  await (await QuestionHandlers.create(data)).get({id })

        res.respond({
            data: question
        });
    });


export const createQuestion =
    catchErrors(async (req, res) => {

        const data = await DataProvider.create()
        const { question, option_one, option_two, option_three,
                option_four,options_answer,video, wrong_video_url,
                reason_one, reason_two, reason_three, reason_four, only_media,
                 option_a_ee_score, option_a_et_score,option_a_eb_score,
                 option_b_ee_score, option_b_et_score, option_b_eb_score,
                 option_c_ee_score, option_c_et_score, option_c_eb_score,
                 option_d_ee_score, option_d_et_score, option_d_eb_score,
        } = req.body



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
            option_a_ee_score, option_a_et_score,option_a_eb_score,
            option_b_ee_score, option_b_et_score, option_b_eb_score,
            option_c_ee_score, option_c_et_score, option_c_eb_score,
            option_d_ee_score, option_d_et_score, option_d_eb_score,
        }

        const body = {
            ...req.body,
            question,
            options: options,
            wrong_video_url,
            video: video?.value,
            only_media
        }

        console.log("options", body)
        const questionsBodyObject = omit(["option_one","option_two","option_three",
                                          "option_four","options_answer","reason_one", "reason_two",
                                          "reason_three", "reason_four",
                                          "option_a_ee_score", "option_a_et_score","option_a_eb_score",
                                          "option_b_ee_score", "option_b_et_score", "option_b_eb_score",
                                          "option_c_ee_score", "option_c_et_score", "option_c_eb_score",
                                          "option_d_ee_score", "option_d_et_score", "option_d_eb_score"
        ], body)
        const inserted =  await (await QuestionHandlers.create(data)).create(questionsBodyObject)

        res.respond({
            data: inserted
        });
    });


export const updateQuestion =
    catchErrors(async (req, res) => {

        const data = await DataProvider.create()
        const {id, question, option_one, option_two, option_three,
            option_four,options_answer,
            reason_one, reason_two, reason_three, reason_four,
            option_a_ee_score, option_a_et_score,option_a_eb_score,
            option_b_ee_score, option_b_et_score, option_b_eb_score,
            option_c_ee_score, option_c_et_score, option_c_eb_score,
            option_d_ee_score, option_d_et_score, option_d_eb_score,
        } = req.body

        console.log("Body", req.body)

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
            option_a_ee_score, option_a_et_score,option_a_eb_score,
            option_b_ee_score, option_b_et_score, option_b_eb_score,
            option_c_ee_score, option_c_et_score, option_c_eb_score,
            option_d_ee_score, option_d_et_score, option_d_eb_score,
        }


        const body = {
            ...req.body,
            id,
            question,
            options: options
        }

        console.log("options", body)
        const questionsBodyObject = omit(["option_one","option_two","option_three",
            "option_four","options_answer","reason_one", "reason_two",
            "reason_three", "reason_four", "enabled",
            "option_a_ee_score", "option_a_et_score","option_a_eb_score",
            "option_b_ee_score", "option_b_et_score", "option_b_eb_score",
            "option_c_ee_score", "option_c_et_score", "option_c_eb_score",
            "option_d_ee_score", "option_d_et_score", "option_d_eb_score"
        ], body)


        console.log("Questions Body Object", questionsBodyObject)

        const inserted =  await (await QuestionHandlers.create(data)).update(questionsBodyObject)
        res.respond({
            data: inserted
        });
    });