
import {DataClient} from '../index'
import VideoController, {Controller} from './VideoController'

export const getVideoList = (video: Controller) => async (req?: Request) => {
  return await video.getList(req)
}

export const createVideo = (video: Controller) => async (req: Request) => {
    return await video.create(req)
}


export const getVideoById = (video: Controller) => async (id: String) => {
  return await video.getById(id)
}

export async function create (data: DataClient) {
  const video = await VideoController.create(data)

  return {
    getList: getVideoList(video),
    create: createVideo(video),
    getById: getVideoById(video)
  }
}

export default {create}
