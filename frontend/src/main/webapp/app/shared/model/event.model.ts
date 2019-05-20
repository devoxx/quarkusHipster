export interface IEvent {
  id?: number;
  name?: string;
  description?: any;
}

export class Event implements IEvent {
  constructor(public id?: number, public name?: string, public description?: any) {}
}
