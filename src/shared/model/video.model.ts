import { IChannel } from './channel.model';
import { IImage } from './image.model';

export interface IVideo {
  id?: number;
  title?: string;
  description?: string;
  keywords?: string;
  visibility?: string;
  duration?: number;
  generateLibras?: boolean;
  generateSubtitle?: boolean;
  qtAccess?: number;
  qtLikes?: number;
  images?: IImage[];
  embed?: string;
  channels?: IChannel[];
}

export class Video implements IVideo {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public keywords?: string,
    public visibility?: string,
    public duration?: number,
    public generateLibras?: boolean,
    public generateSubtitle?: boolean,
    public qtAccess?: number,
    public qtLikes?: number,
    public images?: IImage[],
    public embed?: string,
    public channels?: IChannel[]
  ) {}
}
