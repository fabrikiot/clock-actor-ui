import { Actor, ActorSystem } from "actor-system";
import { ACTOR_ADDRESS } from "./actor-address";
import { rootActorSystem } from "../App";
import GetRandomNumbersActor from "./get-random-numbers-actor";

export default class DataActor extends Actor {
  #randomNumberCount: any;
  #randomNumbers = [];
  static ASKS = {
    SET_RANDOM_NUMBER: "set_random_number",
  };

  static TOPICS = {
    RANDOM_NUMBERS: "current_time",
    ERR: "topic_err",
  };

  constructor(actorSysI: typeof ActorSystem) {
    super(actorSysI);
  }

  ask = async (asktype: string, data: number) => {
    switch (asktype) {
      case DataActor.ASKS.SET_RANDOM_NUMBER:
        return this.#setRandomNumberValue(data);
      default:
        return [null, this.errunsupportedask(asktype, data)];
    }
  };

  #setRandomNumberValue(data: any) {
    if (isNaN(parseInt(data))) {
      return [null, this.errunsupportedask("String is not Supported", data)];
    } else {
      this.#randomNumberCount = data;
      setInterval(() => {
        const GetRandomNumbersActorVal = rootActorSystem?.actorOf?.(
          ACTOR_ADDRESS.GET_RANDOM_NUMBERS_ACTOR
        );

        GetRandomNumbersActorVal.ask(
          GetRandomNumbersActor.ASKS.GET_RANDOM_NUMBERS,
          this.#randomNumberCount
        ).then((res: any) => {
          this.#randomNumbers = res;
          console.log(res);
          this.publish(DataActor.TOPICS.RANDOM_NUMBERS, this.#randomNumbers);
        });
      }, 1000);
      return [this.#randomNumbers, null];
    }
  }
}
