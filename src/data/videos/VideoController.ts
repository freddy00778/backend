import VideoData, {Data, CreateInput} from './VideoData'
import {DataClient} from '../index'
import {GetListInput} from "../phaseSteps/PhaseStepData";

export interface Controller {
  getList:  ReturnType<typeof getVideoList>
  getById:  ReturnType<typeof getVideo>
  create:   ReturnType<typeof createVideo>
  // update:   ReturnType<typeof updateVideo>
}


export const getVideoList = (video: Data) => async (input?: GetListInput) => {
  return video.getList(input)
}

export const getVideo = (video: Data) => async (id: String) => {
  return video.getById(id)
}

export const createVideo = (video: Data) => async (input?: CreateInput) => {
  return video.create(input)
}

// export const updateProduct = (product: Data) => async (input?: CreateInput) => {
//   return product.update(input)
// }

export async function create (data: DataClient): Promise<Controller> {
  const videos = await VideoData.create(data)

  return {
    getList: getVideoList(videos),
    getById: getVideo(videos),
    create: createVideo(videos),
    // update: updateVideo(videos)
  }
}

export default {create}
