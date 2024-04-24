import { Actor, ActorSystem } from "actor-system";

export default class ClockActor extends Actor {
  static ASKS = {
    SET_TIME: "set_time",
  };

  static TOPICS = {
    CURRENT_TIME: "current_time",
    ERR: "topic_err",
  };

  constructor(actorSysI: typeof ActorSystem) {
    super(actorSysI);
  }

  ask = async (asktype: string, data: unknown) => {
    switch (asktype) {
      // case ClockActor.ASKS.REQUEST_APP_INFO:
      //   return this.#askParentForAppInfo();
      default:
        return [null, this.errunsupportedask(asktype, data)];
    }
  };
}
