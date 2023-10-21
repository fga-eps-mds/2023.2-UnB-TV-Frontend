export interface IVideoDetails {
  id?: number;
  url?: string;
}

export class VideoDetails implements IVideoDetails {
  constructor(public id?: number, public url?: string) {}
}
