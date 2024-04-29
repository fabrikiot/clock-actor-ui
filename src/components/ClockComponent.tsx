import { useEffect, useState } from "react";
import { useActorRef } from "../context";
import { ACTOR_ADDRESS } from "../actors/actor-address";
import ClockActor from "../actors/clock-actor";

export const ClockComponent = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const clockActorRef = useActorRef(ACTOR_ADDRESS.CLOCK_ACTOR);

  useEffect(() => {
    clockActorRef.current.ask(ClockActor.ASKS.SET_TIME, "");

    clockActorRef.current.subscribe(
      ClockActor.TOPICS.CURRENT_TIME,
      (res: any, newTime: any) => {
        console.log(res);
        if (newTime !== time) {
          setTime(newTime);
        }
      }
    );
  }, []);

  return <h1>{time}</h1>;
};
