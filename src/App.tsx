import { ACTOR_ADDRESS } from "./actors/actor-address";
import { ActorSystem, WidgetAddressResolver } from "actor-system";
import ClockActor from "./actors/token-actor";
import { AppContextProvider } from "./context";

export default function App() {
  const actorSystem = new ActorSystem(false);
  // Root Actor System
  const rootResolver = new WidgetAddressResolver();
  const rootActorSystem = actorSystem.getChildActorSystem("root", rootResolver);

  // Token Actor
  rootActorSystem.register(
    ACTOR_ADDRESS.CLOCK_ACTOR,
    new ClockActor(rootActorSystem)
  );

  return (
    <AppContextProvider
      value={{
        actorSysI: rootActorSystem,
      }}
    >
      <p>App</p>
    </AppContextProvider>
  );
}
