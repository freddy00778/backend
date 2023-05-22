/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface PhaseStep {
  id: string
  name: string
  order: number
  game: string
  description: string
  column: string
  question: string
  step: string
}

export interface Data {
  create: ReturnType<typeof createPhaseStep>
  list: ReturnType<typeof getStepList>
  getById: ReturnType<typeof getById>
  get: ReturnType<typeof getPhaseStep>
}

export interface GetInput {
  id?: string
  name?: string
  order?: number
  game?: string
  description?: string
  column?: number
  question?: string
  step?: string
}

export interface GetListInput extends Omit<PhaseStep, 'id'> {}

export interface CreateInput extends Omit<PhaseStep, 'id'> {}

export const getById = (steps: () => QueryBuilder) => async (input: GetInput) => {
  return (await steps().select().where({id: input.id}) as PhaseStep[])[0]
}

export const getPhaseStep = (phaseSteps: () => QueryBuilder) => (async (input: GetInput) => {

   const query =  phaseSteps().select('PhaseStep.*',"Step.order",
       "Step.name as step_name","Phase.name as phase_name", "Step.id as stepId", "Question.id as questionId",
       "Question.question as scenario", "Question.options as questionOptions", "Question.description")
       .from('PhaseStep')
      .leftJoin('Step', 'PhaseStep.step', 'Step.id')
      .leftJoin('Phase', 'PhaseStep.phase', 'Phase.id')
      .leftJoin('Question', 'PhaseStep.question', 'Question.id')
      // .leftJoin('UserProgress', 'PhaseStep.id', 'UserProgress.phaseStep')

        if (input && input.id){
          query.where({"PhaseStep.id": input.id})
        }

        if(input && input.order){
          query.where({"Step.order": input.order})
        }

        if(input && input.column){
          query.where({"PhaseStep.column": input.column})
        }

        if (input && !input.order && !input.column && !input.id){
          query.where(input)
        }

        return query.first()
})


export const getStepList = (steps: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = steps().select()
  if (input) query.where(input)

  return (await query as PhaseStep[])
}

export const createPhaseStep = (phaseSteps: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await phaseSteps().insert(input, ['id']) as [{ id: string }])[0];
}

export async function create (data: DataClient): Promise<Data> {
  const phaseSteps = () => data.postgres.withSchema(Database.schema).table('PhaseStep')

  return {
    create:     createPhaseStep(phaseSteps),
    list:       getStepList(phaseSteps),
    getById:    getById(phaseSteps),
    get:        getPhaseStep(phaseSteps),
  }
}

export default {create}
