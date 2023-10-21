export interface IVideoDetails {
  id?: number;
  fileFormat?: string;
  url?: string;
}

export class VideoDetails implements IVideoDetails {
  constructor(
    public id?: number,
    public fileFormat?: string,
    public url?: string
  ) {}
}
