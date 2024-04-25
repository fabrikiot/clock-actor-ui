import { Actor, ActorSystem } from "actor-system";

export default class GetRandomNumbersActor extends Actor {
  #randomNumbers: any = [];
  static ASKS = {
    GET_RANDOM_NUMBERS: "get_random_numbers",
  };

  static TOPICS = {
    CURRENT_TIME: "current_time",
    ERR: "topic_err",
  };

  constructor(actorSysI: typeof ActorSystem) {
    super(actorSysI);
  }

  ask = async (asktype: string, data: number) => {
    switch (asktype) {
      case GetRandomNumbersActor.ASKS.GET_RANDOM_NUMBERS:
        return this.#setRandomNumbers(data);
      default:
        return [null, this.errunsupportedask(asktype, data)];
    }
  };

  #setRandomNumbers(data: number) {
    this.#randomNumbers = [];
    // while(array1.length > 0){
    //     array1.pop()
    //     }
    for (let i = 0; i < data; i++) {
      this.#randomNumbers.push(this.#randomNumber(1, 100));
    }
    return this.#randomNumbers;
  }

  // Function to generate random number
  #randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
