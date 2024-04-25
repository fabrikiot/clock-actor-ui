import { Actor, ActorSystem } from "actor-system";

export default class ClockActor extends Actor {
  #currentTime:any
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
      case ClockActor.ASKS.SET_TIME:
        return this.#getTime();
      default:
        return [null, this.errunsupportedask(asktype, data)];
    }
  };

  #getTime(){
    setInterval(() =>{
      // console.log("in set interval",this.#currentTime)
      this.#currentTime= new Date().toLocaleTimeString()
      this.publish(ClockActor.TOPICS.CURRENT_TIME,this.#currentTime)
      // return this.#currentTime
    },1000)
  }
}
