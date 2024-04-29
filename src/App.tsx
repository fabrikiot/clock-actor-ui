import { ActorSystem, WidgetAddressResolver } from "actor-system";
import { ACTOR_ADDRESS } from "./actors/actor-address";
import ClockActor from "./actors/clock-actor";
import DataActor from "./actors/data-actor";
import GetRandomNumbersActor from "./actors/get-random-numbers-actor";
import { ClockComponent } from "./components/ClockComponent";
import { AppContextProvider } from "./context";

const actorSystem = new ActorSystem(false);
// Root Actor System
const rootResolver = new WidgetAddressResolver();
export const rootActorSystem = actorSystem.getChildActorSystem(
  "root",
  rootResolver
);

// Token Actor
rootActorSystem.register(
  ACTOR_ADDRESS.CLOCK_ACTOR,
  new ClockActor(rootActorSystem)
);

rootActorSystem.register(
  ACTOR_ADDRESS.DATA_ACTOR,
  new DataActor(rootActorSystem)
);

rootActorSystem.register(
  ACTOR_ADDRESS.GET_RANDOM_NUMBERS_ACTOR,
  new GetRandomNumbersActor(rootActorSystem)
);

export default function App() {
  return (
    <AppContextProvider
      value={{
        actorSysI: rootActorSystem,
      }}
    >
      <ClockComponent />
      {/* <RandomNumber /> */}
    </AppContextProvider>
  );
}
