type HookID = "script:upsert";
type Handler = (data: any) => Promise<boolean>;
export default class Hook {
  static instance: Hook = new Hook();

  static getInstance() {
    return Hook.instance;
  }

  hookMap: { [key: string]: Handler[] } = {};

  constructor() {
    if (!Hook.instance) {
      Hook.instance = this;
    }
  }

  public dispatchHook(id: HookID, data: any) {
    if (!this.hookMap[id]) {
      return Promise.resolve();
    }
    return Promise.all(
      this.hookMap[id].map((func) => {
        return func(data);
      })
    );
  }

  public addHook(id: HookID, func: Handler) {
    if (!this.hookMap[id]) {
      this.hookMap[id] = [];
    }
    this.hookMap[id].push(func);
  }
}