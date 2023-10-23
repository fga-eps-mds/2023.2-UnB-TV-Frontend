import { IVideoDetails } from './video-details.model';

export interface IVideoVersion {
  videoVersionList?: IVideoDetails[];
}

export class VideoVersion implements IVideoVersion {
  constructor(public videoVersionList?: IVideoDetails[]) {}
}
