export class Task {
  // _id?: { ObjectId: string };
  _id?: { ObjectId: string };
  name: string;
  userId: string;
  created: string;
  end?: string;
  isDone: boolean;

  constructor(name: string, userId: string, created: string, isDone: boolean, end?: string) {
    this.name = name;
    this.userId = userId;
    this.created = created;
    this.isDone = isDone;
    this.end = end;
  }
}
