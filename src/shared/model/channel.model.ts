export interface IChannel {
  id: number;
  name: string;
}

export class Channel implements IChannel {
  constructor(public id: number, public name: string) {}
}
