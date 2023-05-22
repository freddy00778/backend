/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Video {
  id: string
  name: string
  description: string
  link: string
}

export interface Data {
  getList: ReturnType<typeof getVideoList>,
  getById: ReturnType<typeof getVideoById>,
  create: ReturnType<typeof createVideo>,
  update: ReturnType<typeof updateVideo>,
}

export interface GetInput {
  id?: string
  name?: string
  description?: string
  link?: string
}

export interface GetListInput extends Omit<Video, 'id'> {}

export interface CreateInput extends Omit<Video, 'id'> {}

export const getVideoList = (videos: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = videos().select().orderBy("created_at", "desc")
  if (input) query.where(input)

  return (await query as Video[])
}


export const createVideo = (videos: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await videos().insert(input, ['id', 'name', 'link','description']) as [{ id: string }])[0];
}

export const updateVideo = (videos: () => QueryBuilder) => async (input: GetInput) => {
  return (await videos().select().where({id: input.id}).update(input))
}

export const getVideoById = (videos: () => QueryBuilder) => async (id: String) => {
  return (await videos().select().where({id: id}) as Video[])[0]
}

export async function create (data: DataClient): Promise<Data> {
  const videos = () => data.postgres.withSchema(Database.schema).table('Video')

  return {
    getList:  getVideoList(videos),
    getById:  getVideoById(videos),
    create:   createVideo(videos),
    update:   updateVideo(videos)
  }
}

export default {create}
