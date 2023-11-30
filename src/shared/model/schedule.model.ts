export interface ISchedule {
  time?: string;
  activity?: string;
}

export class Schedule implements ISchedule {
  constructor(public time?: string, public activity?: string) {}
}
