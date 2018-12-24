

export class Doc {
  public _id?: string;
  public _rev?: string;
  public _deleted?: boolean;
  public updated?: number;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }

}


export class Task extends Doc {
  title?: string;
  note?: string;
  category?: string;
  today?: number;
  important?: number;
  priority?: number;
  remindDate?: Date;
  dueDate?: Date;
  done?: boolean;
  docType?: string;
}

export class Category extends Doc {
  title?: string;
  note?:string;
  type:string;

  constructor(values: Object = {}) {
    super();
    if(this.type == null) this.type = 'tasks';
  }
}

export class Settings extends Doc {

  public meta?: string;

  constructor(values: Object = {}) {
      super();
      Object.assign(this, values);
  }


}


export class User extends Doc {
  public username?: string;
  public password?: string;

  constructor(values: Object = {}) {
      super();
      Object.assign(this, values);
  }
}






















