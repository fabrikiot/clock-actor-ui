/* eslint-disable @typescript-eslint/no-explicit-any */
import App from "../../App";

class ClockWidget {
  // actorSysI;
  constructor() {
    // this.actorSysI = actorSysI;
    // registerSClockActor(actorSysI);
  }
  // const clockActorRef = useActorRef(ACTOR_ADDRESS.CLOCK_ACTOR);
  getDom = () => {
    return <App />;
  };
}

export default ClockWidget;
