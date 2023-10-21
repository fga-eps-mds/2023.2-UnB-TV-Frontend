import { IVideo } from "./video.model";

export interface IEduplayVideosByInstitution {
    videoList?: IVideo[];
}

export class EduplayVideosByInstitution implements IEduplayVideosByInstitution {
    constructor(
        public videoList?: IVideo[]
    ) { }
}