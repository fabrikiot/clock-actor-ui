import { useEffect, useState } from "react";
import { useActorRef } from "../context";
import { ACTOR_ADDRESS } from "../actors/actor-address";
import DataActor from "../actors/data-actor";

export const RandomNumber = () => {
  const [randomNumbersCount, setRandomNumbersCount]: any = useState("");
  const [randomNumbers, setRandomNumbers] = useState([]);
  const DataActorRef = useActorRef(ACTOR_ADDRESS.DATA_ACTOR);

  useEffect(() => {
    DataActorRef.current.subscribe(
      DataActor.TOPICS.RANDOM_NUMBERS,
      (res: any, randomNumbersArr: any) => {
        console.log(randomNumbersArr);
        setRandomNumbers([]);
        setRandomNumbers(randomNumbersArr);
      }
    );
    return () => {
      // DataActor.current.unsubscribe(DataActor.TOPICS.RANDOM_NUMBERS);
    };
  }, [randomNumbers]);

  return (
    <>
      <input
        onChange={(e) => {
          setRandomNumbersCount(e.target.value);
        }}
        value={randomNumbersCount}
      />
      <button
        onClick={() => {
          DataActorRef.current
            .ask(DataActor.ASKS.SET_RANDOM_NUMBER, randomNumbersCount)
            .then((res: any) => {
              if (res[1] && res[1] !== null) {
                console.error(JSON.stringify(res[1]));
              } else {
                console.log(res, "RESS");
              }
            });
        }}
      >
        Get Random Numbers
      </button>
      {randomNumbers.map((num, index) => {
        return <h3 key={index}>{num}</h3>;
      })}
    </>
  );
};
