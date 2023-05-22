/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Step {
  id: string,
  name: string,
  order?: number,
}

export interface Data {
  create: ReturnType<typeof createStep>
  list: ReturnType<typeof getStepList>
  getStepById: ReturnType<typeof getStepById>
  get: ReturnType<typeof getStep>
  getStepsByGameID: ReturnType<typeof getStepsByGameID>
  getByGameIdAndColumn: ReturnType<typeof getByGameIdAndColumn>
}

export interface GetInput {
  id?: string,
  name?: string,
  order?: number
}

export interface GetListInput extends Omit<Step, 'id'> {}

export interface CreateInput extends Omit<Step, 'id'> {}


// @ts-ignore
export const getStepsByGameID = (steps: () => QueryBuilder) => async (game: String) => {
  return steps().select("Step.*","PhaseStep.id as phase_step_id","PhaseStep.game as game_id",
      "PhaseStep.name as phase_step_name","PhaseStep.video_url as step_video", "" +
      "PhaseStep.enabled as step_enabled", "Phase.name as phase_name", "PhaseStep.column as column",
      "Question.question", "Question.options", "Question.correct_video_url",
      "Question.wrong_video_url", "Question.only_media", "Video.link", "Video.mime_type", "Video.description as videoDescription")
      .from('Step')
      .leftJoin('PhaseStep', 'Step.id', 'PhaseStep.step')
      .leftJoin("Phase", "PhaseStep.phase","Phase.id")
      .leftJoin("Question", "PhaseStep.question","Question.id")
      .leftJoin("Video", "Question.video","Video.id")
      .where({"PhaseStep.game": game})
      .orderBy('order', 'asc')
}

export const getByGameIdAndColumn = (steps: () => QueryBuilder) => async (game: String, column:number) => {
  return steps().select("Step.*","PhaseStep.id as phase_step_id","PhaseStep.game as game_id",
      "PhaseStep.name as phase_step_name","PhaseStep.video_url as step_video", "PhaseStep.enabled as step_enabled",
      "Phase.name as phase_name", "Question.question", "Question.options",
      "Question.correct_video_url", "Question.wrong_video_url")
      .from('Step')
      .leftJoin('PhaseStep', 'Step.id', 'PhaseStep.step')
      .leftJoin("Phase", "PhaseStep.phase","Phase.id")
      .leftJoin("Question", "PhaseStep.question","Question.id")
      .where({"PhaseStep.game": game, "PhaseStep.column": column})
      .orderBy('order', 'asc')
}

export const getStepById = (steps: () => QueryBuilder) => async (input: GetInput) => {
  return (await steps().select().where({id: input.id}) as Step[])[0]
}

export const getStep = (steps: () => QueryBuilder) => async (input: GetInput) => {
  const stepQb =  steps().select("Step.*","PhaseStep.id as phase_step_id","PhaseStep.game as game_id",
      "PhaseStep.name as phase_step_name","PhaseStep.video_url as step_video", "PhaseStep.enabled as step_enabled",
      "Phase.name as phase_name", "Question.question", "Question.options",
      "Question.correct_video_url", "Question.wrong_video_url", "Question.id as question_id")
      .from('Step')
      .leftJoin('PhaseStep', 'Step.id', 'PhaseStep.step')
      .leftJoin("Phase", "PhaseStep.phase","Phase.id")
      .leftJoin("Question", "PhaseStep.question","Question.id");

      if(input && input.id ){
        stepQb.where("Step.id", input.id)
      }

    if(input && input.order ){
      stepQb.where("Step.order", input.order)
    }

      return stepQb.first()
}


export const getStepList = (steps: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = steps().select()
  if (input) query.where(input)

  return (await query as Step[])
}


export const createStep = (steps: () => QueryBuilder) => async (input: CreateInput) => {
  return (await steps().insert(input, ['id']) as [{ id: string }])[0];
}

export async function create (data: DataClient): Promise<Data> {
  const steps = () => data.postgres.withSchema(Database.schema).table('Step')

  return {
    create:               createStep(steps),
    list:                 getStepList(steps),
    getStepById:          getStepById(steps),
    get:                  getStep(steps),
    getStepsByGameID:     getStepsByGameID(steps),
    getByGameIdAndColumn: getByGameIdAndColumn(steps)
  }
}

export default {create}
