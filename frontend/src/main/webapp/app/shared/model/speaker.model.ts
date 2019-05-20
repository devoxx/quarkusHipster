export interface ISpeaker {
  id?: number;
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export class Speaker implements ISpeaker {
  constructor(public id?: number, public firstName?: string, public lastName?: string, public bio?: string) {}
}
